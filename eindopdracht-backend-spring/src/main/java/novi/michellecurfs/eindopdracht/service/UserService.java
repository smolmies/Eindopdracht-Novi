package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.User;

public interface UserService {

    public abstract String createUser(User user);
    public abstract void updateUser(String username, User user);
    public abstract void deleteUser(String username);
    public abstract User getUser(String username);
}
