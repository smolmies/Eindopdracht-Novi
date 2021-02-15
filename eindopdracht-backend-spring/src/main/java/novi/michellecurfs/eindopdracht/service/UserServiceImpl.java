package novi.michellecurfs.eindopdracht.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import novi.michellecurfs.eindopdracht.model.User;
import novi.michellecurfs.eindopdracht.payload.response.MessageResponse;
import novi.michellecurfs.eindopdracht.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Value("${novi.sec.jwtSecret}")
    private String jwtSecret;

    private static final String PREFIX = "Bearer ";

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    private UserRepository userRepository;

    @Autowired
    public void setEncoder(PasswordEncoder encoder) {
        this.encoder = encoder;
    }
    private PasswordEncoder encoder;

    @Override
    public String createUser(User user) {
        User newUser = userRepository.save(user);
        return newUser.getUsername();
    }

    @Override
    public void updateUser(String username, User newUser) {
        User user = userRepository.findByUsername(username).get();
        user.setPassword(newUser.getPassword());
        userRepository.save(user);
    }

    @Override
    public void deleteUser(String username) {
        userRepository.deleteById(username);
    }

//    @Override
//    public Optional<User> getUser(String username) {
//        return  userRepository.findByUsername(username);
//    }

    @Override
    public ResponseEntity<?> findUserByToken(String token) {
        String username = getUsernameFromToken(token);

        if(userExists(username)) {
            return ResponseEntity.ok(userToString(username));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
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

    private String userToString(String username){
        User user = findUserByUsername(username);
        return "Huidige gebruiker: " +
                "Naam: " + user.getUsername() +
                "Email: " + user.getEmail() +
                "Telefoon: " + user.getPhoneNumber() +
                "Huisdieren: " + user.getPets();
    }

    @Override
    public ResponseEntity<?> getAllUsers() {

        List<User> users = userRepository.findAll();

        if(users.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("No Users found!"));
        }
        return ResponseEntity.ok(users);
    }
}
