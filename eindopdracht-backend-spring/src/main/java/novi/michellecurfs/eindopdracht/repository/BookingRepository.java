package novi.michellecurfs.eindopdracht.repository;

import novi.michellecurfs.eindopdracht.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findAllOrderByStartDateDesc(long bookingId);
    Optional<Booking> findById(long bookingId);
    void deleteById(long bookingId);
}
