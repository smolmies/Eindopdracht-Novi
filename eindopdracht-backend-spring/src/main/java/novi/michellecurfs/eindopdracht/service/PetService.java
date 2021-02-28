package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Pet;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface PetService {

    public abstract String createPet(Pet pet);
    public abstract void deletePet(String petName);
    public abstract Optional<Pet> getPetByPetName(String petName);
    public abstract ResponseEntity<?> getAllPets();
}
