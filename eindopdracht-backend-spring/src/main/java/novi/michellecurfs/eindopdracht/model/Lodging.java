package novi.michellecurfs.eindopdracht.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table
@SequenceGenerator(name="tableseq")
public class Lodging {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tableseq")
    private long lodgingId;

    @Column
    private String roomName;

    @Column
    private String roomDescription;


    @OneToMany(
            targetEntity = Booking.class,
            mappedBy = "lodging",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
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
    public List<Booking> getBookings() {
        return bookings;
    }
    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

}
