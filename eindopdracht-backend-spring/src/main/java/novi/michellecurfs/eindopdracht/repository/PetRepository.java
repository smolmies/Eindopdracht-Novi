package novi.michellecurfs.eindopdracht.repository;

import novi.michellecurfs.eindopdracht.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, String> {
    Optional<Pet> findByPetName(String petName);
}
