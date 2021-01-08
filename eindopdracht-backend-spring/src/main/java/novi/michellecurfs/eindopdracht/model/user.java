package novi.michellecurfs.eindopdracht.model;

import javax.persistence.Column;
import javax.persistence.Id;

public class user {

    @Id
    @Column(name = "user_id")
    private int userId;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "password")
    private String password;

    public int getUserId() {
        return userId;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public String getPassword() {
        return password;
    }
}

