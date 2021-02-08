package novi.michellecurfs.eindopdracht.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.Date;
import java.util.Set;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long bookingId;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @Column
    private String amountPets;

    @ManyToOne
    private Lodging lodging;

    @ManyToMany(mappedBy = "bookingSet")
    private Set<Pet> petSet;

    public Booking(){

    }

    public Booking(Date startDate, Date endDate, String amountPets ){
        this.startDate = startDate;
        this.endDate = endDate;
        this.amountPets = amountPets;
    }

    public long getBookingId() {
        return bookingId;
    }
    public void setBookingId(long bookingId) {
        this.bookingId = bookingId;
    }
    public Date getStartDate() {
        return startDate;
    }
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
    public Date getEndDate() {
        return endDate;
    }
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
    public String getAmountPets() {
        return amountPets;
    }
    public void setAmountPets(String amountPets) {
        this.amountPets = amountPets;
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
    public void setPetSet(Set<Pet> petSet) {
        this.petSet = petSet;
    }
}
