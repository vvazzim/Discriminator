const mongoose = require('mongoose');

const url ='mongodb://127.0.0.1:27017/DBMediCall' ;
const connect = mongoose.connect(url );
connect.then((db)=>{
    console.log(url);
    console.log('The DataBase is connected with the server now ')
}).catch((err)=>{
    console.log("Mongoose Connection Error =" , err.message)
});

// Importing Models
// Import the model for the collection you want to insert data into
const Agenda = require('./models/Agenda.model');
const Archive = require('./models/Archive.model');
const Assistant = require('./models/Assistant.model');
const ArretTravail = require('./models/ArretTravail.model');
const Bilan = require('./models/Bilan.model');
const CabinetMedical = require('./models/CabinetMedical.model');
const Certificat = require('./models/Certificat.model');
const Consultation = require('./models/Consultation.model');
const DossierMedical = require('./models/DossierMedical.model');
const Facture = require('./models/Facture.model');
const FichierMedical = require('./models/FichierMedical.model');
const LettreOrientation = require('./models/LettreOrientation.model');
const Medicament = require('./models/Medicament.model');
const Medecin = require('./models/Medecin.model');
const Notification = require('./models/Notification.model');
const Patient = require('./models/Patient.model');
const Prescription = require('./models/Prescription.model');
const RDV = require('./models/RDV.model');
const Traitement = require('./models/Traitement.model');
const Utilisateur = require('./models/Utilisateur.model');





// Create an array of data to insert into the collection
const archiveData = [
    {
        document: '61d0b4d4ed69c105e8dbf9d6', // This should be an ObjectId of the document being archived.
        documentType: 'Patient', // Use 'documentType' instead of 'typeDocument' and use one of the enum values from the schema.
        // contenu: 'Contenu de la lettre d\'orientation archivée pour le patient 1.', // This field doesn't exist in the schema. You may need to update your schema if you want to include it.
        dateArchivage: new Date(),
        // dateCreation: new Date(), // This field doesn't exist in the schema. You may need to update your schema if you want to include it.
        archivePar: '61d0b4d4ed69c105e8dbf9d5', // This should be an ObjectId of the 'Utilisateur' who archived the document.
        raison: 'Some reason for archiving', // Provide a reason for archiving.
    },
    {
        document: '61d0b4d4ed69c105e8dbf9d7', // This should be an ObjectId of the document being archived.
        documentType: 'Medecin', // Use one of the enum values from the schema.
        // contenu: 'Contenu du certificat médical archivé pour le patient 2.', // This field doesn't exist in the schema. You may need to update your schema if you want to include it.
        dateArchivage: new Date(),
        // dateCreation: new Date(), // This field doesn't exist in the schema. You may need to update your schema if you want to include it.
        archivePar: '61d0b4d4ed69c105e8dbf9d5', // This should be an ObjectId of the 'Utilisateur' who archived the document.
        raison: 'Another reason for archiving', // Provide a reason for archiving.
    },
];


// Insert the data into the collection
Archive.insertMany(archiveData)
    .then(() => {
        console.log('Data inserted successfully.');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error inserting data:', error);
        mongoose.connection.close();
    });



// Data to insert into the Agenda collection
const agendaData = [
    {
        utilisateur: '61d0b4d4ed69c105e8dbf9d5',
        date: new Date('2022-05-01T14:30:00'),
        disponibilites: [
            {
                jour: 'Dimanche',
                heureDebut: new Date('2022-05-01T14:30:00'),
                heureFin: new Date('2022-05-01T15:00:00'),
            },
        ],
    },
    {
        utilisateur: '61d0b4d4ed69c105e8dbf9d5',
        date: new Date('2022-05-02T10:00:00'),
        disponibilites: [
            {
                jour: 'Lundi',
                heureDebut: new Date('2022-05-02T10:00:00'),
                heureFin: new Date('2022-05-02T11:00:00'),
            },
        ],
    },
];


// Insert the data into the Agenda collection
Agenda.insertMany(agendaData)
    .then(() => {
        console.log('Data inserted successfully into the Agenda collection.');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error while inserting data into the Agenda collection:', error);
        mongoose.connection.close();
    });



// Data to insert into the ArretTravail collection
const arretTravailData = {
    DossierMedical: "60e3d3de8227f5e5a5e5c5c5",
    medecin: "60e3d3de8227f5e5a5e5c5c6",
    patient: "60e3d3de8227f5e5a5e5c5c7",
    dateDebut: new Date("2023-05-01"),
    dateFin: new Date("2023-05-15"),
    raison: "Medical issue requiring rest",
    commentaire: "The patient should avoid physical activities during this period.",
    auteur: "Medecin",
    type: "Arret de travail",
    contenu: "This document serves as a medical leave notice for the patient.",
    dateCreation: new Date()
};

// Insert data into the ArretTravail collection
ArretTravail.insertMany(arretTravailData)
    .then(() => {
        console.log('Data inserted successfully into the ArretTravail collection.');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error inserting data into the ArretTravail collection:', error);
        mongoose.connection.close();
    });




// Data to insert into the Assistant collection
const assistantData = [
    {
        cabinetMedical: "61d0c5e5e5e5e5a5a5a5a5a5",
        utilisateur: "61d0b4d4ed69c105e8dbf9d6",
        email: "assistant1@example.com",
        motDePasse: "password1",
        nom: "Doe",
        prenom: "John",
        telephone: "+11234567890",
        adresse: "123 Main St, City, Country",
        typeUtilisateur: "assistant"
    },
    {
        cabinetMedical: "61d0c5e5e5e5e5a5a5a5a5a6",
        utilisateur: "61d0b4d4ed69c105e8dbf9d8",
        email: "assistant2@example.com",
        motDePasse: "password2",
        nom: "Smith",
        prenom: "Jane",
        telephone: "+12234567890",
        adresse: "456 Elm St, City, Country",
        typeUtilisateur: "assistant"
    },
];

// Insert data into the Assistant collection
Assistant.insertMany(assistantData)
    .then(() => {
        console.log('Data inserted successfully into Assistant collection.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Error while inserting data into Assistant collection:', erreur);
        mongoose.connection.close();
    });






const bilanData = [
    {
        DossierMedical: "61d0c5e5e5e5e5a5a5a5a5a5",
        medecin: "61d0b4d4ed69c105e8dbf9d9",
        auteur: "Medecin",
        type: "Bilan",
        contenu: "Bilan 1",
        dateCreation: new Date(),
        patient: "61d0b4d4ed69c105e8dbf9d6",
        date: new Date(),
        poids: 70,
        taille: 175,
        tension: {
            systolique: 120,
            diastolique: 80,
        },
        temperature: 36.5,
        cholesterol: 160,
        glycemie: 80,
        diagnostic: "Nothing to report",
        traitement: "No treatment to prescribe",
        observations: "The patient is doing well",
    },
    {
        DossierMedical: "61d0c5e5e5e5e5a5a5a5a5a6",
        medecin: "61d0b4d4ed69c105e8dbf9da",
        auteur: "Medecin",
        type: "Bilan",
        contenu: "Bilan 2",
        dateCreation: new Date(),
        patient: "61d0b4d4ed69c105e8dbf9d7",
        date: new Date(),
        poids: 80,
        taille: 180,
        tension: {
            systolique: 130,
            diastolique: 90,
        },
        temperature: 37.2,
        cholesterol: 180,
        glycemie: 110,
        diagnostic: "Respiratory infection",
        traitement: "Prescribe antibiotics",
        observations: "The patient should return in 3 days for a follow-up",
    },
];



// Insert data into the Bilan collection
Bilan.insertMany(bilanData)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Bilan.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Bilan :', erreur);
        mongoose.connection.close();
    });





// Données à insérer dans la collection CabinetMedical
const cabinetMedicalData = [
    {   nom: 'Cabinet Médical Paris',
        adresse: {            rue: '123 Rue du Faubourg Saint-Honoré',
            ville: 'Paris',            codePostal: '75008',
            pays: 'France',        },        numeroTelephone: '0123456789',
        medecins: []
    },
    {
        nom: 'Cabinet Médical Lyon',
        adresse: {
            rue: '456 Rue de la République',
            ville: 'Lyon',
            codePostal: '69002',
            pays: 'France',
        },
        numeroTelephone: '0123456789',
        medecins: []
    },
];


// Insertion des données dans la collection CabinetMedical
CabinetMedical.insertMany(cabinetMedicalData)
    .then(() => {
        console.log('Données insérées avec succès dans la collection CabinetMedical.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection CabinetMedical :', erreur);
        mongoose.connection.close();
    });




// Données à insérer dans la collection Certificat
const certificatData = [
    {
        DossierMedical: "61d0c5e5e5e5e5a5a5a5a5a5",
        medecin: "61d0b4d4ed69c105e8dbf9d5",
        auteur: "Medecin",
        type: "Certificat Medical",
        dateCreation: new Date(),
        patient: "61d0b4d4ed69c105e8dbf9d6",
        date: new Date(),
        contenu: "Contenu du certificat médical pour le patient 1.",
    },
    {
        DossierMedical: "61d0c5e5e5e5e5a5a5a5a5a6",
        medecin: "61d0b4d4ed69c105e8dbf9d5",
        auteur: "Medecin",
        type: "Certificat Medical",
        dateCreation: new Date(),
        patient: "61d0b4d4ed69c105e8dbf9d7",
        date: new Date(),
        contenu: "Contenu du certificat médical pour le patient 2.",
    },
];

// Insertion des données dans la collection Certificat
Certificat.insertMany(certificatData)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Certificat.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Certificat :', erreur);
        mongoose.connection.close();
    });




// Insertion des données dans la collection Consultation
const consultationData = [
    {
        patient: '61d0b4d4ed69c105e8dbf9d6',
        medecin: '61d0b4d4ed69c105e8dbf9d7',
        date: new Date(),
        symptomes: 'Fièvre, toux',
        diagnostic: 'Grippe',
        ordonnance: 'Doliprane, repos',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
    {
        patient: '61d0b4d4ed69c105e8dbf9d7',
        medecin: '61d0b4d4ed69c105e8dbf9d8',
        date: new Date(),
        symptomes: 'Douleur abdominale',
        diagnostic: 'Appendicite',
        ordonnance: 'Chirurgie',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
];

// Insertion des données dans la collection Consultation
Consultation.insertMany(consultationData)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Consultation.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Consultation :', erreur);
        mongoose.connection.close();
    });





// Insertion des données dans la collection DossierMedical
const dossierMedicalData = [
    {
        patient: '61d0b4d4ed69c105e8dbf9d7',
        antecedentsPersonnels: 'Antécédents personnels du patient 1.',
        antecedentsFamiliaux: 'Antécédents familiaux du patient 1.',
        antecedentsChirurgicaux: 'Antécédents chirurgicaux du patient 1.',
        allergies: 'Allergies du patient 1.',
        traitements: [
            {
                medicament: '61d0b5eb3d5f74f2fc54a7fc',
                dose: '2 comprimés par jour',
                duree: '1 mois',
                dateDebut: new Date(),
                dateFin: new Date(),
            },
            {
                medicament: '61d0b5eb3d5f74f2fc54a7fd',
                dose: '1 comprimé par jour',
                duree: '2 semaines',
                dateDebut: new Date(),
                dateFin: new Date(),
            },
        ],
    },
    {
        patient: '61d0b4d4ed69c105e8dbf9d8',
        antecedentsPersonnels: 'Antécédents personnels du patient 2.',
        antecedentsFamiliaux: 'Antécédents familiaux du patient 2.',
        antecedentsChirurgicaux: 'Antécédents chirurgicaux du patient 2.',
        allergies: 'Allergies du patient 2.',
        traitements: [
            {
                medicament: '61d0b5eb3d5f74f2fc54a7fd',
                dose: '1 comprimé par jour',
                duree: '3 semaines',
                dateDebut: new Date(),
                dateFin: new Date(),
            },
        ],
    },
];

// Insertion des données dans la collection DossierMedical
DossierMedical.insertMany(dossierMedicalData)
    .then(() => {
        console.log('Data inserted into DossierMedical collection.');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error inserting data into DossierMedical collection:', error);
        mongoose.connection.close();
    });








// Insertion des données dans la collection Facture
const factureData = [
    {
        patient: "6160e5a7c5f5da35d0a8b9a0",
        consultation: "6161f5d5e5e5e5a5a5a5a5a1",
        date: new Date(),
        description: "Consultation médicale",
        total: 50,
        paiements: [
            {
                montant: 50,
                date: new Date(),
            },
        ],
        statut: "payée",
    },
    {
        patient: "6160e5a7c5f5da35d0a8b9a2",
        consultation: "6161f5d5e5e5e5a5a5a5a5a2",
        date: new Date(),
        description: "Consultation médicale et examens",
        total: 100,
        paiements: [
            {
                montant: 50,
                date: new Date(),
            },
            {
                montant: 50,
                date: new Date(),
            },
        ],
        statut: "payée",
    },
    {
        patient: "6160e5a7c5f5da35d0a8b9a4",
        consultation: "6161f5d5e5e5e5a5a5a5a5a3",
        date: new Date(),
        description: "Consultation spécialisée",
        total: 75,
        paiements: [
            {
                montant: 25,
                date: new Date(),
            },
            {
                montant: 50,
                date: new Date(),
            },
        ],
        statut: "payée",
    },
];


// Insertion des données dans la collection Facture
Facture.insertMany(factureData)
    .then(() => {
        console.log('Data inserted successfully into the Facture collection.');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error inserting data into the Facture collection:', error);
        mongoose.connection.close();
    });





// Insertion des données dans la collection FihierMedical
const fichiersMedicalData = [
    {
        DossierMedical: "61d0b4d4ed69c105e8dbf9d6",
        medecin: "61d0b4d4ed69c105e8dbf9d5",
        auteur: "Medecin",
        type: "Bilan",
        contenu: "Contenu des résultats d'analyse pour le patient 1.",
        dateCreation: new Date(),
    },
    {
        DossierMedical: "61d0b4d4ed69c105e8dbf9d7",
        medecin: "61d0b4d4ed69c105e8dbf9d5",
        auteur: "Medecin",
        type: "Prescription",
        contenu: "Contenu de l'ordonnance pour le patient 2.",
        dateCreation: new Date(),
    },
];


// Insertion des données dans la collection FihierMedical
FichierMedical.insertMany(fichiersMedicalData)
    .then(() => {
        console.log('Data inserted successfully into the FichierMedical collection.');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error inserting data into the FichierMedical collection:', error.message);
        mongoose.connection.close();
    });





// Insertion des données dans la collection LettresOrientation
const lettresOrientationData = [
    {
        DossierMedical: "60ecb85d7a52de10d0a5375c",
        medecin: "60ecb5ee7a52de10d0a53757",
        patient: "61d0b4d4ed69c105e8dbf9d6", // Ajouté le champ patient
        auteur: "Medecin",
        type: "Lettre dorientation",
        contenu: "Contenu de la lettre d'orientation pour le patient 1.",
        dateCreation: new Date(),
    },
    {
        DossierMedical: "60ecb85d7a52de10d0a5375d",
        medecin: "60ecb5ee7a52de10d0a53758",
        patient: "61d0b4d4ed69c105e8dbf9d7", // Ajouté le champ patient
        auteur: "Medecin",
        type: "Lettre dorientation",
        contenu: "Contenu de la lettre d'orientation pour le patient 2.",
        dateCreation: new Date(),
    },
];





// Insertion des données dans la collection LettresOrientation
LettreOrientation.insertMany(lettresOrientationData)
    .then(() => {
        console.log('Data inserted successfully into LettreOrientation collection.');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error inserting data into LettreOrientation collection:', error);
        mongoose.connection.close();
    });






// Insertion des données dans la collection Medecin
const medecinData = [
    {
        utilisateur: '61d0b4d4ed69c105e8dbf9d5',
        specialite: 'Cardiologie',
        cabinets: ['61d0b4d4ed69c105e8dbf9d4'],
        telephone: '1234567890',
        prenom: 'John',
        nom: 'Doe',
        motDePasse: 'password123',
        email: 'john.doe@example.com',
        typeUtilisateur: 'medecin',
        adresse: '1 Rue Exemple, 75001 Paris',
    },
    {
        utilisateur: '61d0b4d4ed69c105e8dbf9d7',
        specialite: 'Dermatologie',
        cabinets: ['61d0b4d4ed69c105e8dbf9d4', '61d0b4d4ed69c105e8dbf9d9'],
        telephone: '2345678901',
        prenom: 'Jane',
        nom: 'Doe',
        motDePasse: 'password456',
        email: 'jane.doe@example.com',
        typeUtilisateur: 'medecin',
        adresse: '2 Rue Exemple, 75002 Paris',
    },
];


// Insertion des données dans la collection Medecin
Medecin.insertMany(medecinData)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Medecin.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de linsertion des données dans la collection Medecin :', erreur);
        mongoose.connection.close();
    });




// Données à insérer dans la collection Medicament
const medicamentData = [
    {
        nom: 'Aspirine',
        description: 'Traitement de la douleur légère à modérée',
        posologie: '1 à 2 comprimés par jour',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
    {
        nom: 'Paracétamol',
        description: 'Traitement de la douleur légère à modérée et de la fièvre',
        posologie: '1 à 2 comprimés par jour',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
];

// Insertion des données dans la collection Medicament
Medicament.insertMany(medicamentData)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Medicament.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Medicament :', erreur);
        mongoose.connection.close();
    });



// Data to insert into the Notification collection
const notificationData = [
    {
        utilisateur: new mongoose.Types.ObjectId('610d0b4d4ed69c105e8dbf97'),
        message: 'Vous avez un nouveau message.',
        dateEnvoi: new Date(),
        type: 'Autre',
        lu: false,
    },
    {
        utilisateur: '61d0b4d4ed69c105e8dbf9d6',
        message: 'Votre rendez-vous du 10/02/2023 a été annulé.',
        dateEnvoi: new Date(),
        type: 'Rendez-vous',
        lu: false,
    },
];

// Inserting data into the Notification collection
Notification.insertMany(notificationData)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Notification.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Notification :', erreur);
        mongoose.connection.close();
    });


// Données à insérer dans la collection Patient
const patientData = [
    {
        typeUtilisateur: 'patient',
        nom: 'Smith',
        prenom: 'John',
        email: 'john.smith@example.com',
        motDePasse: 'password123',
        dateNaissance: new Date('1990-01-01'),
        sexe: 'Homme',
        adresse: '123 Main Street',
        telephone: '555-1234',
        profession: 'Ingénieur',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
    {
        typeUtilisateur: 'patient',
        nom: 'Doe',
        prenom: 'Jane',
        email: 'jane.doe@example.com',
        motDePasse: 'password123',
        dateNaissance: new Date('1985-05-05'),
        sexe: 'Femme',
        adresse: '456 Elm Street',
        telephone: '555-5678',
        profession: 'Médecin',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
];


// Inserting data into the Patient collection
Patient.insertMany(patientData)
    .then(() => {
        console.log('Data inserted successfully');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error while inserting data:', error.message);
        mongoose.connection.close();
    });



// Données à insérer dans la collection RDV
const rdvData = [
    {
        medecin: '61d0b4d4ed69c105e8dbf9d6',
        patient: '61d0b4d4ed69c105e8dbf9d7',
        date: new Date('2022-04-15T10:30:00'),
        motif: 'Consultation pour douleurs abdominales.',
    },
    {
        medecin: '61d0b4d4ed69c105e8dbf9d6',
        patient: '61d0b4d4ed69c105e8dbf9d8',
        date: new Date('2022-04-16T14:00:00'),
        motif: 'Consultation pour examen de routine.',
    },
];

// Insertion des données dans la collection RDV
RDV.insertMany(rdvData)
    .then(() => {
        console.log('Données insérées avec succès dans la collection RDV.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection RDV :', erreur);
        mongoose.connection.close();
    });


// Données à insérer dans la collection Traitement
const traitementData = [
    {
        medicament: '61d0b4d4ed69c105e8dbf9d1',
        posologie: 'Posologie 1',
        duree: 10,
        dateDebut: new Date(),
    },
    {
        medicament: '61d0b4d4ed69c105e8dbf9d2',
        posologie: 'Posologie 2',
        duree: 20,
        dateDebut: new Date(),
    },
];

// Insertion des données dans la collection Traitement
Traitement.insertMany(traitementData)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Traitement.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Traitement :', erreur);
        mongoose.connection.close();
    });




// Data to insert into the collection Utilisateur
const utilisateurData = [
    {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        motDePasse: '123456',
        typeUtilisateur: 'medecin',
        adresse: '20 rue de Paris, 75001 Paris',
        telephone: '01 23 45 67 89',
    },
    {
        nom: 'Martin',
        prenom: 'Marie',
        email: 'marie.martin@example.com',
        motDePasse: '123456',
        typeUtilisateur: 'assistant',
        adresse: '10 rue de Marseille, 13001 Marseille',
        telephone: '04 91 23 45 67',
    },
    {
        nom: 'Durand',
        prenom: 'Lucie',
        email: 'lucie.durand@example.com',
        motDePasse: '123456',
        typeUtilisateur: 'patient',
        adresse: '30 rue de Lyon, 69001 Lyon',
        telephone: '04 72 12 34 56',
    },
];

// Insert data into the collection Utilisateur
Utilisateur.insertMany(utilisateurData)
    .then(() => {
        console.log('Data inserted successfully into the Utilisateur collection.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Error while inserting data into the Utilisateur collection:', erreur);
        mongoose.connection.close();
    });





// Data to insert into the collection Prescription
const prescriptionData = {
    consultation: "64395e0bd4190785ef63a757",
    traitements: [
        "643b79677d538a0220b2c0dc",
        "643b79677d538a0220b2c0dd",
    ],

    DossierMedical: "64395e26fc241d3b614692e4",
    medecin: "643b76fc718f736b0da145a2",
    auteur: 'Medecin',
    type: 'Prescription',
    contenu: "Prendre 2 comprimés de paracétamol toutes les 4 heures en cas de fièvre",
    dateCreation: new Date(),

};


// Insert data into the collection Prescription
Prescription.insertMany(prescriptionData)
    .then(() => {
        console.log('Data inserted successfully into the Prescription collection.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Error while inserting data into the Prescription collection:', erreur);
        mongoose.connection.close();
    });
