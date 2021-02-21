package novi.michellecurfs.eindopdracht.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table
@SequenceGenerator(name="tableseq")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tableseq")
    private long petId;

    @Column
    private String petName;

    @Column
    private String specialNeeds;

    @Column
    private String extraInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "pet_booking",
            joinColumns = @JoinColumn(name = "pet_id"),
            inverseJoinColumns = @JoinColumn(name="booking_id")
    )
    private List<Booking> bookingSet;

    public Pet(){

    }

    public Pet(String petName, String specialNeeds, String extraInfo){
        this.petName = petName;
        this.specialNeeds = specialNeeds;
        this.extraInfo = extraInfo;
        this.bookingSet = new ArrayList<Booking>();
    }


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
    public String getExtraInfo() {
        return extraInfo;
    }
    public void setExtraInfo(String extraInfo) {
        this.extraInfo = extraInfo;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public List<Booking> getBookingSet() {
        return bookingSet;
    }
    public void setBookingSet(List<Booking> bookingSet) {
        this.bookingSet = bookingSet;
    }

    public void addBooking(Booking booking){
        this.bookingSet.add(booking);
    }
}
