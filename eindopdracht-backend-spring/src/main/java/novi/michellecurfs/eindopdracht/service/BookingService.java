package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Booking;
import novi.michellecurfs.eindopdracht.payload.request.BookingRequest;
import novi.michellecurfs.eindopdracht.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

public interface BookingService {

    public abstract ResponseEntity<?> getAllBookings();
    public abstract ResponseEntity<?> getBookingsOfUser(String token);
    public abstract ResponseEntity<MessageResponse> createBooking(String token, BookingRequest bookingRequest);
    public abstract ResponseEntity<?> checkIfDateAvailable(Date startDate, Date endDate);
    public abstract ResponseEntity<?> updateBookingById(String token, BookingRequest bookingRequest);
    public abstract ResponseEntity<?> deleteBooking(String token, long bookingId);


}
