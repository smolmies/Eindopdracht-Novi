package novi.michellecurfs.eindopdracht.controller;

import novi.michellecurfs.eindopdracht.payload.request.BookingRequest;
import novi.michellecurfs.eindopdracht.payload.request.UserUpdateRequest;
import novi.michellecurfs.eindopdracht.payload.response.MessageResponse;
import novi.michellecurfs.eindopdracht.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/booking")
public class BookingController {

    private BookingService bookingService;

    @Autowired
    public void setBookingService(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getBookingsOfUser(@RequestHeader Map<String, String> headers){
        return bookingService.getBookingsOfUser(headers.get("authorization"));
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MessageResponse> createBooking(@RequestHeader Map<String, String> headers, @RequestBody BookingRequest bookingRequest){
        return bookingService.createBooking(headers.get("authorization"), bookingRequest);
    }


    @PatchMapping("/update")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateBooking(@RequestHeader Map<String, String> headers, @RequestBody BookingRequest bookingRequest){

        return bookingService.updateBookingById(headers.get("authorization"), bookingRequest);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteBooking(@RequestHeader Map<String, String> headers, @RequestBody long bookingId){
        return bookingService.deleteBooking(headers.get("authorization"), bookingId);
    }
}
