package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.User;
import novi.michellecurfs.eindopdracht.payload.request.UserUpdateRequest;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface UserService {
    public abstract ResponseEntity<?> updateUserById(String token, UserUpdateRequest updateRequest);
    public abstract void deleteUser(String username);
    public abstract ResponseEntity<?> findUserByToken(String token);
    public ResponseEntity<?> getAllUsers();

}
