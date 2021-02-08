package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Lodging;
import novi.michellecurfs.eindopdracht.repository.LodgingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void updateLodging(String roomName, Lodging newLodging) {
        Lodging lodging = lodgingRepository.findByRoomName(roomName);
        lodging.setRoomDescription(newLodging.getRoomDescription());
        lodgingRepository.save(lodging);
    }

    @Override
    public void deleteLodging(String roomName) {
        lodgingRepository.deleteById(roomName);
    }

    @Override
    public Lodging getLodging(String roomName) {
        return lodgingRepository.findByRoomName(roomName);
    }
}
