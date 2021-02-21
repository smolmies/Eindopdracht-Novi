package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.User;
import novi.michellecurfs.eindopdracht.payload.request.UserUpdateRequest;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface UserService {

    public abstract ResponseEntity<?> updateUserById(String token, UserUpdateRequest updateRequest);
    public abstract ResponseEntity<?> deleteUser(String token, String username);
    public abstract ResponseEntity<?> findUserByToken(String token);
    public abstract Optional<User> getUserByUsername(String username);
    public abstract ResponseEntity<?> getAllUsers();

}
