package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Booking;
import org.springframework.stereotype.Service;

import java.util.Optional;


public interface BookingService {

    public abstract long createBooking(Booking booking);
    public abstract void updateBooking(long bookingId, Booking booking);
    public abstract void deleteBooking(long bookingId);
    public abstract Optional<Booking> getBooking(long bookingId);
}
