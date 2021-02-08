package novi.michellecurfs.eindopdracht.service;

import novi.michellecurfs.eindopdracht.model.Lodging;

public interface LodgingService {

    public abstract String createLodging(Lodging lodging);
    public abstract void updateLodging(String roomName, Lodging lodging);
    public abstract void deleteLodging(String roomName);
    public abstract Lodging getLodging(String roomName);
}
