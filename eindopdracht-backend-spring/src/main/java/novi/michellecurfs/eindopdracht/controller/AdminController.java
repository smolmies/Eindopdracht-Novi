package novi.michellecurfs.eindopdracht.controller;

import novi.michellecurfs.eindopdracht.service.BookingService;
import novi.michellecurfs.eindopdracht.service.PetService;
import novi.michellecurfs.eindopdracht.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/all")
public class AdminController {

    private BookingService bookingService;
    private UserService userService;
    private PetService petService;

    @Autowired
    public void setBookingService(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Autowired
    public void setPetService(PetService petService) {
        this.petService = petService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> findAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/pets")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> findAllPets() {
        return petService.getAllPets();
    }

    @GetMapping("/bookings")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> findAllBookings() {
        return bookingService.getAllBookings();
    }
}
