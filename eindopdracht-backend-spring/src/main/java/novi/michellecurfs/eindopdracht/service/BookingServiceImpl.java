package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Booking;
import novi.michellecurfs.eindopdracht.model.Pet;
import novi.michellecurfs.eindopdracht.payload.request.BookingRequest;
import novi.michellecurfs.eindopdracht.payload.response.MessageResponse;
import novi.michellecurfs.eindopdracht.repository.BookingRepository;
import novi.michellecurfs.eindopdracht.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService{

    private BookingRepository bookingRepository;
    private PetRepository petRepository;


    @Autowired
    public void setBookingRepository(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Autowired
    public void setPetRepository(PetRepository petRepository) {
        this.petRepository = petRepository;
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
    public ResponseEntity<MessageResponse> createBooking(@Valid BookingRequest bookingRequest) {
// TODO check the booking form/ date available


        Booking booking = new Booking(
                bookingRequest.getStartDate(),
                bookingRequest.getEndDate(),
                bookingRequest.getAmountPets());

        Pet pet = new Pet(
                bookingRequest.getPetName(),
                bookingRequest.getSpecialNeeds(),
                bookingRequest.getExtraInfo());


        bookingRepository.save(booking);
        petRepository.save(pet);

        System.out.println(booking);
        System.out.println(pet);
        return ResponseEntity.ok(new MessageResponse("Booking registered successfully!"));
    }
}


