export class Appointment {
    constructor (year, month, day, hour, minute, isTaken, patient, doctor ) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.isTaken = isTaken;
        this.patient = patient;
        this.doctor = doctor;

    }

    // toString() {
    //     return this.firstname + ', ' + this.lastname + ', ' + this.adresse + ', ' + this.city;
    // }
}