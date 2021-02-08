package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Pet;
import novi.michellecurfs.eindopdracht.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void deletePet(String petName) {
        petRepository.deleteById(petName);
    }
}
