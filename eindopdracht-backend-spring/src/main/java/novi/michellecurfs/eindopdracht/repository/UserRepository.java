package novi.michellecurfs.eindopdracht.repository;

import novi.michellecurfs.eindopdracht.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
