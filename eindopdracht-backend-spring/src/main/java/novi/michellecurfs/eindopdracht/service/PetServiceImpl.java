package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Pet;
import novi.michellecurfs.eindopdracht.payload.response.MessageResponse;
import novi.michellecurfs.eindopdracht.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetServiceImpl implements PetService{

    @Autowired
    private PetRepository petRepository;

    @Override
    public String createPet(Pet pet) {
        Pet newPet = petRepository.save(pet);
        return newPet.getPetName();
    }

    @Override
    public Optional<Pet> getPetByPetName(String petName) {
        return petRepository.findByPetName(petName);

    }
    @Override
    public void deletePet(String petName) {
        petRepository.deleteById(petName);
    }

    @Override
    public ResponseEntity<?> getAllPets(){
        List<Pet> pets = petRepository.findAll();
        if(pets.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("No pets found!"));
        }
        return ResponseEntity.ok(pets);
    }
}
