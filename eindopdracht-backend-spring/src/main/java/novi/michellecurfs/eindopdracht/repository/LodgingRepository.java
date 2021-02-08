package novi.michellecurfs.eindopdracht.repository;

import novi.michellecurfs.eindopdracht.model.Lodging;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LodgingRepository extends JpaRepository<Lodging, String> {


    Lodging findByRoomName(String roomName);
}
