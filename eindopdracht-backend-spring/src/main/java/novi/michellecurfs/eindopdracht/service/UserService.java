package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.User;

import java.util.Optional;

public interface UserService {

    public abstract String createUser(User user);
    public abstract void updateUser(String username, User user);
    public abstract void deleteUser(String username);
    public abstract Optional<User> getUser(String username);

}
