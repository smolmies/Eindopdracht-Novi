package novi.michellecurfs.eindopdracht.repository;

import novi.michellecurfs.eindopdracht.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, String> {

    List<Booking> findAll();
    Optional<Booking> findByBookingId(long bookingId);
    void deleteByBookingId(long bookingId);
}
