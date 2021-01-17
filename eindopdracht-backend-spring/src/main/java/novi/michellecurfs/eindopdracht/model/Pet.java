package novi.michellecurfs.eindopdracht.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Entity
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long petId;

    @Column
    private String petName;

    @Column
    private String specialNeeds;

    @ManyToMany(targetEntity = Reservation.class)
    private Set reservationSet;

    public long getPetId() {
        return petId;
    }
    public void setPetId(long petId) {
        this.petId = petId;
    }
    public String getPetName() {
        return petName;
    }
    public void setPetName(String petName) {
        this.petName = petName;
    }
    public String getSpecialNeeds() {
        return specialNeeds;
    }
    public void setSpecialNeeds(String specialNeeds) {
        this.specialNeeds = specialNeeds;
    }
    public Set getReservationSet() {
        return reservationSet;
    }
    public void setReservationSet(Set reservationSet) {
        this.reservationSet = reservationSet;
    }
}
