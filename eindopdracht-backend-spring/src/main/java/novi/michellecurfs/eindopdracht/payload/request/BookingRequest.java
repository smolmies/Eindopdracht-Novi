package novi.michellecurfs.eindopdracht.payload.request;

import javax.validation.constraints.NotNull;
import java.util.Date;

public class BookingRequest {

    @NotNull
    private Date startDate;

    @NotNull
    private Date endDate;

    @NotNull
    private int amountPets;

    private String petName;

    private String specialNeeds;

    private String extraInfo;

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

    public int getAmountPets() {
        return amountPets;
    }

    public void setAmountPets(int amountPets) {
        this.amountPets = amountPets;
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
}
