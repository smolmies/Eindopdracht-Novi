package novi.michellecurfs.eindopdracht.model;

import javax.persistence.Column;
import javax.persistence.Id;

public class lodging {

    @Id
    @Column(name = "lodging_id")
    private int lodgingId;

    @Column(name = "available")
    private Boolean available;
}
