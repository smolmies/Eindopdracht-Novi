package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Lodging;
import org.springframework.http.ResponseEntity;

public interface LodgingService {

    public abstract String createLodging(Lodging lodging);
    public abstract void updateLodging(String roomName,String roomDescription, Lodging lodging);
    public abstract void deleteLodging(String roomName);
    public abstract Lodging getLodging(String roomName);
    public abstract ResponseEntity<?> getAllLodging();
}
