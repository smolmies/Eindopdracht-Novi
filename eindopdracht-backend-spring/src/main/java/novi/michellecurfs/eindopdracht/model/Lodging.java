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
    private Boolean available;

    @OneToMany(
            targetEntity = Reservation.class,
            mappedBy = "start-date",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    private List<Reservation> Reservations;


    public long getLodgingId() {
        return lodgingId;
    }
    public void setLodgingId(long lodgingId) {
        this.lodgingId = lodgingId;
    }
    public Boolean getAvailable() {
        return available;
    }
    public void setAvailable(Boolean available) {
        this.available = available;
    }
    public List<Reservation> getReservations() {
        return Reservations;
    }
    public void setReservations(List<Reservation> reservations) {
        Reservations = reservations;
    }
}
