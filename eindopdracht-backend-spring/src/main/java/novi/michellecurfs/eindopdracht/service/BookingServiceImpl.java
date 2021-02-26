package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Booking;
import novi.michellecurfs.eindopdracht.model.ERole;
import novi.michellecurfs.eindopdracht.model.Pet;
import novi.michellecurfs.eindopdracht.model.Role;
import novi.michellecurfs.eindopdracht.model.User;
import novi.michellecurfs.eindopdracht.payload.request.BookingRequest;
import novi.michellecurfs.eindopdracht.payload.response.BookingResponse;
import novi.michellecurfs.eindopdracht.payload.response.MessageResponse;
import novi.michellecurfs.eindopdracht.repository.BookingRepository;
import novi.michellecurfs.eindopdracht.repository.PetRepository;
import novi.michellecurfs.eindopdracht.repository.RoleRepository;
import novi.michellecurfs.eindopdracht.repository.UserRepository;
import org.joda.time.DateTime;
import org.joda.time.Interval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService{

    private BookingRepository bookingRepository;
    private PetRepository petRepository;
    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private UserService userService;

    @Autowired
    public void setBookingRepository(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Autowired
    public void setPetRepository(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseEntity<?> getAllBookings() {

        List<Booking> bookings = bookingRepository.findAll();
        List<BookingResponse> bookingResponse = createBookingResponse(bookings);
        if(bookings.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("No Bookings found!"));
        }
        return ResponseEntity.ok(bookingResponse);
    }

    @Override
    public ResponseEntity<?> getBookingsOfUser(String token) {
        List<Booking> bookings = findBookingsByUser(token);
        return ResponseEntity.ok(createBookingResponse(bookings));
    }

    @Override
    public ResponseEntity<?> updateBookingById(String token, @Valid BookingRequest bookingRequest) {
        List <Booking> bookingsOfUser = findBookingsByUser(token);
        Booking booking = bookingRepository.findByBookingId(bookingRequest.getBookingId()).get();

      // TODO  checkIfDateAvailable(bookingRequest.getStartDate(), bookingRequest.getEndDate());

        if (bookingsOfUser.contains(booking)) {
            Booking updatedBooking = bookingRepository.findByBookingId(booking.getBookingId()).get();
            if(bookingRequest.getStartDate() != null){
                updatedBooking.setStartDate(bookingRequest.getStartDate());
            }
            if(bookingRequest.getEndDate() != null){
                updatedBooking.setEndDate(bookingRequest.getEndDate());
            }
            if(bookingRequest.getSpecialNeeds() != null && !bookingRequest.getSpecialNeeds().isEmpty()){
                updatedBooking.getPetSet().get(0).setSpecialNeeds(bookingRequest.getSpecialNeeds());
            }
            if(bookingRequest.getExtraInfo() != null && !bookingRequest.getExtraInfo().isEmpty()){
                updatedBooking.getPetSet().get(0).setExtraInfo(bookingRequest.getExtraInfo());
            }
            return ResponseEntity.ok().body(bookingRepository.save(updatedBooking));

        }
        return ResponseEntity.badRequest().body(new MessageResponse("Booking cannot be updated with provided data."));

    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteBooking(String token, long bookingId) {
        Optional<Role> admin = roleRepository.findByName(ERole.ROLE_ADMIN);
        User bookingUser = (User) userService.findUserByToken(token).getBody();
        List<Booking> bookingsOfUser = findBookingsByUser(token);

        List<Long> bookingIdsList = new ArrayList<>();
        for (Booking b : bookingsOfUser) {
            bookingIdsList.add(b.getBookingId());
        }

        // TODO make check for bookings, only bookings that are in the future can be deleted by the user. (admin can delete any?)

        if (bookingIdsList.contains(bookingId) || bookingUser.getRoles().contains(admin)) {
            bookingRepository.deleteByBookingId(bookingId);
            return ResponseEntity.ok(new MessageResponse( "Booking " + bookingId + " has been deleted successfully!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Booking doesn't exist or can not be deleted"));
    }

    @Override
    public ResponseEntity<MessageResponse> createBooking(String token, @Valid BookingRequest bookingRequest) {
        // TODO check the booking form/ date available
        //  checkIfDateAvailable(bookingRequest.getStartDate(), bookingRequest.getEndDate());

        Booking booking = new Booking(
                bookingRequest.getStartDate(),
                bookingRequest.getEndDate(),
                bookingRequest.getAmountPets());

        Booking savedBooking =  bookingRepository.save(booking);

        User bookingUser = (User) userService.findUserByToken(token).getBody();

        List<String> names = new ArrayList<>();
        for (Pet p : bookingUser.getPets()) {
            names.add(p.getPetName());
        }
        if(!names.contains(bookingRequest.getPetName())){
            Pet pet = new Pet(
                    bookingRequest.getPetName(),
                    bookingRequest.getSpecialNeeds(),
                    bookingRequest.getExtraInfo());
                    pet.addBooking(savedBooking);
                    pet.setUser(bookingUser);
                    petRepository.save(pet);
        } else {
            Pet pet = petRepository.findByPetName(bookingRequest.getPetName()).get();
            pet.setSpecialNeeds(bookingRequest.getSpecialNeeds());
            pet.setExtraInfo(bookingRequest.getExtraInfo());
            pet.addBooking(savedBooking);
            petRepository.save(pet);
        }
        return ResponseEntity.ok(new MessageResponse("Booking registered successfully! Here is the ID " + booking.getBookingId()));
    }

    @Override
    public ResponseEntity<?> checkIfDateAvailable(Date startDate, Date endDate){
        Boolean available = checkIfDateIsFree(startDate, endDate);
        if (available == false){
            return ResponseEntity.badRequest().body(new MessageResponse("Cannot book a booking with provided date"));
        }
        return ResponseEntity.ok().body(new MessageResponse("Date is available for booking!"));
    }


    public boolean checkIfDateIsFree(Date startDate, Date endDate){
        Date today = DateTime.now().toDate();
        if(startDate.before(today) || endDate.before(today)){
            return false;
        }
        if(endDate.before(startDate)) {
            return false;
        }

        Interval newBookingInterval = new Interval(new DateTime(startDate),new DateTime(endDate));
        List<Booking> allBookings = bookingRepository.findAll();
        boolean overlaps = false;
        for(Booking b : allBookings){
            Interval currentBooking = new Interval(new DateTime(b.getStartDate()),new DateTime(b.getEndDate()));
            overlaps = newBookingInterval.overlaps(currentBooking);
            if(overlaps){
                break;
            }
        } return overlaps;
    }


    private List<Booking> findBookingsByUser(String token){
        User bookingUser = (User) userService.findUserByToken(token).getBody();
        List<Pet> pets = bookingUser.getPets();

        List<Booking> bookings = new ArrayList<>();
        for (Pet p : pets){
            bookings.addAll(p.getBookingSet());
        }

        return bookings;
    }

    private List<BookingResponse> createBookingResponse(List<Booking> bookings){
        List<BookingResponse> bookingResponse = new ArrayList<>();
        for(Booking book : bookings){
            bookingResponse.add(new BookingResponse(
                    book.getBookingId(),
                    book.getStartDate(),
                    book.getEndDate(),
                    book.getPetSet().get(0).getPetName(),
                    book.getPetSet().get(0).getSpecialNeeds(),
                    book.getPetSet().get(0).getExtraInfo()
            ));
        }
        Collections.sort(bookingResponse, Comparator.comparing(BookingResponse::getStartDate));

        return bookingResponse;
    }
}


