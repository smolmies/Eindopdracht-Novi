package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Booking;
import novi.michellecurfs.eindopdracht.model.Pet;
import novi.michellecurfs.eindopdracht.model.User;
import novi.michellecurfs.eindopdracht.payload.request.BookingRequest;
import novi.michellecurfs.eindopdracht.payload.response.MessageResponse;
import novi.michellecurfs.eindopdracht.repository.BookingRepository;
import novi.michellecurfs.eindopdracht.repository.PetRepository;
import novi.michellecurfs.eindopdracht.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService{

    private BookingRepository bookingRepository;
    private PetRepository petRepository;
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

        if(bookings.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("No Bookings found!"));
        }
        return ResponseEntity.ok(bookings);
    }

    @Override
    public void updateBooking(long bookingId, Booking newBooking) {
        Booking booking = bookingRepository.findByBookingId(bookingId).get();
        booking.setEndDate(newBooking.getEndDate());
        bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(long bookingId) {
        bookingRepository.deleteByBookingId(bookingId);
    }

    @Override
    public Optional<Booking> getBooking(long bookingId) {
        return bookingRepository.findByBookingId(bookingId);
    }

    @Override
    public ResponseEntity<MessageResponse> createBooking(String token, @Valid BookingRequest bookingRequest) {
// TODO check the booking form/ date available

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
            pet.addBooking(savedBooking);
            petRepository.save(pet);
        }
        return ResponseEntity.ok(new MessageResponse("Booking registered successfully! Here is the ID " + booking.getBookingId()));
    }
}


