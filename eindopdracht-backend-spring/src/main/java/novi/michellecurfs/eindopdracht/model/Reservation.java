package novi.michellecurfs.eindopdracht.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.Set;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long reservationId;

    @Column(name = "start-date")
    private String startDate;

    @Column(name = "end-date")
    private String endDate;

    @Column(name = "amount-pets")
    private String amountPets;

    @ManyToOne
    private User user;

    @ManyToOne
    private Lodging lodging;

    @ManyToMany(targetEntity = Pet.class)
    private Set petSet;

    public long getReservationId() {
        return reservationId;
    }
    public void setReservationId(long reservationId) {
        this.reservationId = reservationId;
    }
    public String getStartDate() {
        return startDate;
    }
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
    public String getEndDate() {
        return endDate;
    }
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
    public String getAmountPets() {
        return amountPets;
    }
    public void setAmountPets(String amountPets) {
        this.amountPets = amountPets;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Lodging getLodging() {
        return lodging;
    }
    public void setLodging(Lodging lodging) {
        this.lodging = lodging;
    }
    public Set getPetSet() {
        return petSet;
    }
    public void setPetSet(Set petSet) {
        this.petSet = petSet;
    }
}
