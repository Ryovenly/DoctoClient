class Patient {
    constructor (firstname, lastname, adresse, city ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.adresse = adresse;
        this.city = city;

    }
    toString() {
        return this.firstname + ', ' + this.lastname + ', ' + this.adresse + ', ' + this.city;
    }
}

// Firestore data converter
export const patientConverter = {
    toFirestore: (patient) => {
        return {
            name: patient.firstname,
            lastname: patient.lastname,
            adresse: patient.adresse,
            city: patient.city,

            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Patient(data.firstname, data.lastname, data.adresse, data.city);
    }
};