package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Pet;

public interface PetService {

    public abstract String createPet(Pet pet);
    public abstract void deletePet(String petName);
}
