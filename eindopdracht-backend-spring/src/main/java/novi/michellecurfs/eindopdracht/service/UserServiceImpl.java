package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.ERole;
import novi.michellecurfs.eindopdracht.model.Role;
import novi.michellecurfs.eindopdracht.model.User;
import novi.michellecurfs.eindopdracht.payload.request.UserUpdateRequest;
import novi.michellecurfs.eindopdracht.payload.response.MessageResponse;
import novi.michellecurfs.eindopdracht.repository.RoleRepository;
import novi.michellecurfs.eindopdracht.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.validation.Valid;
import javax.xml.bind.DatatypeConverter;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Value("${novi.sec.jwtSecret}")
    private String jwtSecret;

    private static final String PREFIX = "Bearer ";

    private PasswordEncoder encoder;
    private RoleRepository roleRepository;
    private BookingService bookingService;
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    @Autowired
    public void setBookingService(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Autowired
    public void setEncoder(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Override
    public ResponseEntity<?> getAllUsers() {

        List<User> users = userRepository.findAll();

        if(users.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("No Users found!"));
        }
        return ResponseEntity.ok(users);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
       return userRepository.findByUsername(username);

    }

    @Override
    public ResponseEntity<?> updateUserById(String token, @Valid UserUpdateRequest updateRequest) {
        if(token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid token"));
        }
        String username =  getUsernameFromToken(token);

        if(userExists(username) && updateRequestIsValid(updateRequest)) {
            User updatedUser = findUserByUsername(username);
            if(!updateRequest.getPassword().isEmpty() && !updateRequest.getRepeatedPassword().isEmpty()) {
                updatedUser.setPassword(encoder.encode(updateRequest.getPassword()));
            }
            if(!userRepository.existsByEmail(updateRequest.getEmail()) && updateRequest.getEmail() != null && !updateRequest.getEmail().isEmpty())  {
                updatedUser.setEmail(updateRequest.getEmail());
            }
            if(updateRequest.getPhoneNumber() != null && !updateRequest.getPhoneNumber().isEmpty()) {
                updatedUser.setPhoneNumber(updateRequest.getPhoneNumber());
            }
            return ResponseEntity.ok().body(userRepository.save(updatedUser));
        }

        return ResponseEntity.badRequest().body(new MessageResponse("User cannot be updated with provided data."));
    }

    @Override
    public ResponseEntity<?> findUserByToken(String token) {
        String username = getUsernameFromToken(token);

        if(userExists(username)) {
            return ResponseEntity.ok(findUserByUsername(username));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteUser(String token, String username) {
        String currentUsername = getUsernameFromToken(token);
        User currentUser = findUserByUsername(currentUsername);
        User targetUser = findUserByUsername(username);
        Optional<Role> admin = roleRepository.findByName(ERole.ROLE_ADMIN);

        if(currentUser.getUsername().equalsIgnoreCase(targetUser.getUsername()) || currentUser.getRoles().contains(admin)){
            if(bookingService.hasNoFutureBookings(targetUser.getUsername())){
            userRepository.deleteByUsername(targetUser.getUsername());
            return ResponseEntity.ok().body(new MessageResponse("User has been deleted"));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("User can not be deleted"));
    }

    private String getUsernameFromToken(String token) {
        String tokenWithoutBearer = removePrefix(token);

        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(jwtSecret))
                .parseClaimsJws(tokenWithoutBearer).getBody();
        return claims.getSubject();
    }

    private String removePrefix(String token) {
        return token.replace(PREFIX, "");
    }

    private boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }

    private User findUserByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

    private boolean updateRequestIsValid(UserUpdateRequest userUpdateRequest) {
        if(userUpdateRequest.getPassword().equals(userUpdateRequest.getRepeatedPassword())) {
            return true;
        }
        return false;
    }

}
