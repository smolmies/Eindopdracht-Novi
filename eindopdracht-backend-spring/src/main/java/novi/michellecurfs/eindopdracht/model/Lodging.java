package novi.michellecurfs.eindopdracht.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Lodging {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long lodgingId;

    @Column
    private String roomName;

    @Column
    private String roomDescription;

    @Column
    private Boolean available;

    @OneToMany(
            targetEntity = Booking.class,
            mappedBy = "lodging",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    private List<Booking> bookings;

    public Lodging() {

    }

    public Lodging(String roomName, String roomDescription) {
        this.roomName = roomName;
        this.roomDescription = roomDescription;
    }

    public long getLodgingId() {
        return lodgingId;
    }
    public void setLodgingId(long lodgingId) {
        this.lodgingId = lodgingId;
    }
    public String getRoomName() {
        return roomName;
    }
    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
    public String getRoomDescription() {
        return roomDescription;
    }
    public void setRoomDescription(String roomDescription) {
        this.roomDescription = roomDescription;
    }
    public Boolean getAvailable() {
        return available;
    }
    public void setAvailable(Boolean available) {
        this.available = available;
    }
    public List<Booking> getBookings() {
        return bookings;
    }
    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

}
