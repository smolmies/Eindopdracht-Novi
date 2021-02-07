package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.User;
import novi.michellecurfs.eindopdracht.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public String createUser(User user) {
        User newUser = userRepository.save(user);
        return newUser.getUsername();
    }

    @Override
    public void updateUser(String username, User newUser) {
        User user = userRepository.findById(username).get();
        user.setPassword(newUser.getPassword());
        userRepository.save(user);
    }

    @Override
    public void deleteUser(String username) {
        userRepository.deleteById(username);
    }

    @Override
    public Optional<User> getUser(String username) {
        return  userRepository.findByUsername(username);
    }
}
