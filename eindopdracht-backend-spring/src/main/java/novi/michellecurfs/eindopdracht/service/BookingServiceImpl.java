package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Booking;
import novi.michellecurfs.eindopdracht.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService{

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public long createBooking(Booking booking) {
        Booking newBooking = bookingRepository.save(booking);
        return newBooking.getBookingId();
    }

    @Override
    public void updateBooking(long bookingId, Booking newBooking) {
        Booking booking = bookingRepository.findById(bookingId).get();
        booking.setEndDate(newBooking.getEndDate());
        bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public Optional<Booking> getBooking(long bookingId) {
        return bookingRepository.findById(bookingId);
    }
}


