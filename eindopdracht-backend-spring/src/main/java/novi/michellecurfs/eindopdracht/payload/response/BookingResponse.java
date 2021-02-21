package novi.michellecurfs.eindopdracht.payload.response;

import java.util.Date;

public class BookingResponse {
    private long bookingId;
    private Date startDate;
    private Date endDate;
    private String petName;
    private String specialNeeds;
    private String extraInfo;

    public BookingResponse(long bookingId, Date startDate, Date endDate, String petName, String specialNeeds, String extraInfo) {
        this.bookingId = bookingId;
        this.startDate = startDate;
        this.endDate = endDate;
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
