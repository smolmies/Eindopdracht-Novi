package novi.michellecurfs.eindopdracht.payload.request;

import javax.validation.constraints.NotNull;
import java.util.Date;

public class BookingRequest {

    private long bookingId;

    @NotNull
    private Date startDate;

    @NotNull
    private Date endDate;

    @NotNull
    private int amountPets;

    private String petName;

    private String specialNeeds;

    private String extraInfo;

    public BookingRequest(Long bookingId, Date startDate, Date endDate, int amountPets, String petName, String specialNeeds, String extraInfo) {
        this.bookingId = bookingId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amountPets = amountPets;
        this.petName = petName;
        this.specialNeeds = specialNeeds;
        this.extraInfo = extraInfo;
    }

    public BookingRequest(@NotNull Date startDate, @NotNull Date endDate, @NotNull int amountPets, String petName, String specialNeeds, String extraInfo) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.amountPets = amountPets;
        this.petName = petName;
        this.specialNeeds = specialNeeds;
        this.extraInfo = extraInfo;
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
