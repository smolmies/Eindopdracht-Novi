package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Lodging;
import novi.michellecurfs.eindopdracht.payload.response.MessageResponse;
import novi.michellecurfs.eindopdracht.repository.LodgingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LodgingServiceImpl implements LodgingService{

    @Autowired
    private LodgingRepository lodgingRepository;

    @Override
    public String createLodging(Lodging lodging) {
        Lodging newLodging = lodgingRepository.save(lodging);
        return newLodging.getRoomName();
    }

    @Override
    public void updateLodging(String roomName, String roomDescription, Lodging lodging) {
        Lodging newLodging = lodgingRepository.findByRoomName(roomName);
        newLodging.setRoomName(lodging.getRoomName());
        newLodging.setRoomDescription(lodging.getRoomDescription());
        lodgingRepository.save(newLodging);
    }

    @Override
    public void deleteLodging(String roomName) {
        lodgingRepository.deleteById(roomName);
    }

    @Override
    public Lodging getLodging(String roomName) {
        return lodgingRepository.findByRoomName(roomName);
    }

    @Override
    public ResponseEntity<?> getAllLodging(){
        List<Lodging> lodgings = lodgingRepository.findAll();
        if(lodgings.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("No lodgings found!"));
        }
        return ResponseEntity.ok(lodgings);
    }

}
