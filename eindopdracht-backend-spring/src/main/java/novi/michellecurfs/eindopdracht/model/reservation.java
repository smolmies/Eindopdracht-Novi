package novi.michellecurfs.eindopdracht.model;

import javax.persistence.Column;

public class reservation {

     @Column(name = "pet_name")
     private String petName;

    @Column(name = "start-date")
    private String startDate;

    @Column(name = "end-date")
    private String endDate;

    @Column(name = "amount-pets")
    private String amountPets;

    @Column(name = "special-needs")
    private String specialNeeds;

    public String getPetName() {
        return petName;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public String getAmountPets() {
        return amountPets;
    }

    public String getSpecialNeeds() {
        return specialNeeds;
    }
}
