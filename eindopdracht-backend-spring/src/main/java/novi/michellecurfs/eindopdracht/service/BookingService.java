package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Booking;
import novi.michellecurfs.eindopdracht.payload.request.BookingRequest;
import novi.michellecurfs.eindopdracht.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface BookingService {

    public abstract ResponseEntity<MessageResponse> createBooking(String token, BookingRequest bookingRequest);
    public abstract ResponseEntity<?> getAllBookings();
    public abstract void updateBooking(long bookingId, Booking booking);
    public abstract void deleteBooking(long bookingId);
    public abstract Optional<Booking> getBooking(long bookingId);
}
