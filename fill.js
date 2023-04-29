const Archivage = require('./models/Archive.model');
const Agenda = require('./models/Agenda.model');
const CabinetMedical = require('./models/CabinetMedical.model');
const Consultation = require('./models/Consultation.model');
const DossierMedical = require('./models/DossierMedical.model');
const Facture = require('./models/Facture.model');
const FichierMedical = require('./models/FichierMedical.model');
const Medicament = require('./models/Medicament.model');
const Prescription = require('./models/Prescription.model');
const Rendezvous = require('./models/RDV.model');
const Traitement = require('./models/Traitement.model');
const Utilisateur = require('./models/Utilisateur.model');
const Notification = require('./models/Notification.model');

const mongoose = require('mongoose');



// Connect to database
const url ='mongodb://127.0.0.1:27017/DBMediCall' ;
const connect = mongoose.connect(url );
connect.then((db)=>{
    console.log(url);
    console.log('The DataBase is connected with the server now ')
}).catch((err)=>{
    console.log("Mongoose Connection Error =" , err.message)
});





// Données à insérer dans la collection Archivage
const donnees = [
    {
        patient: '61d0b4d4ed69c105e8dbf9d6',
        typeDocument: 'Lettre d\'orientation',
        contenu: 'Contenu de la lettre d\'orientation archivée pour le patient 1.',
        dateArchivage: new Date(),
        dateCreation: new Date(),
    },
    {
        patient: '61d0b4d4ed69c105e8dbf9d7',
        typeDocument: 'Certificat médical',
        contenu: 'Contenu du certificat médical archivé pour le patient 2.',
        dateArchivage: new Date(),
        dateCreation: new Date(),
    },
];

// Insertion des données dans la collection Archivage
Archivage.insertMany(donnees)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Archivage.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Archivage :', erreur);
        mongoose.connection.close();
    });




// Données à insérer dans la collection Utilisateur
const donnees1 = [
    {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        motDePasse: '123456',
        typeUtilisateur: 'medecin',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
    {
        nom: 'Martin',
        prenom: 'Marie',
        email: 'marie.martin@example.com',
        motDePasse: '123456',
        typeUtilisateur: 'assistant',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
    {
        nom: 'Durand',
        prenom: 'Lucie',
        email: 'lucie.durand@example.com',
        motDePasse: '123456',
        typeUtilisateur: 'patient',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
];

// Insertion des données dans la collection Utilisateur
Utilisateur.insertMany(donnees1)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Utilisateur.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Utilisateur :', erreur);
        mongoose.connection.close();
    });

//***************************************************************************************************************************





// Données à insérer dans la collection Agenda
const donnees2 = [
    {
        medecin: '61d0b4d4ed69c105e8dbf9d5',
        dateDebut: new Date('2022-01-01T08:00:00'),
        dateFin: new Date('2022-01-01T12:00:00'),
        disponible: false,
    },
    {
        medecin: '61d0b4d4ed69c105e8dbf9d5',
        dateDebut: new Date('2022-01-01T14:00:00'),
        dateFin: new Date('2022-01-01T18:00:00'),
        disponible: true,
    },
    {
        medecin: '61d0b4d4ed69c105e8dbf9d5',
        dateDebut: new Date('2022-01-02T08:00:00'),
        dateFin: new Date('2022-01-02T12:00:00'),
        disponible: false,
    },
];

// Insertion des données dans la collection Agenda
Agenda.insertMany(donnees2)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Agenda.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Agenda :', erreur);
        mongoose.connection.close();
    });








// Données à insérer dans la collection CabinetMedical
const donnees3 = [
    {
        nom: 'Cabinet médical ABC',
        adresse: '123 rue Principale',
        ville: 'Montréal',
        province: 'Québec',
        codePostal: 'H1A 2B3',
        telephone: '514-123-4567',
        courriel: 'info@cabinetmedicalabc.com',
        logo: 'http://url-de-l-image/logo.png',
    },
];

// Insertion des données dans la collection CabinetMedical
CabinetMedical.insertMany(donnees3)
    .then(() => {
        console.log('Données insérées avec succès dans la collection CabinetMedical.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection CabinetMedical :', erreur);
        mongoose.connection.close();
    });






// Données à insérer dans la collection DossierMedical
const DossierMedicalDonnees = [
    {
        patient: '61d0b4d4ed69c105e8dbf9d6',
        fichiers: [
            {
                nom: 'Radiographie',
                url: 'https://exemple.com/radiographie.pdf',
                type: 'PDF',
            },
            {
                nom: 'Prescription',
                url: 'https://exemple.com/prescription.pdf',
                type: 'PDF',
            },
        ],
        prescriptions: ['61d0b4d4ed69c105e8dbf9d9', '61d0b4d4ed69c105e8dbf9da'],
        autresDocuments: [],
    },
    {
        patient: '61d0b4d4ed69c105e8dbf9d7',
        fichiers: [
            {
                nom: 'Radiographie',
                url: 'https://exemple.com/radiographie.pdf',
                type: 'PDF',
            },
            {
                nom: 'Analyse de sang',
                url: 'https://exemple.com/analyse-de-sang.pdf',
                type: 'PDF',
            },
        ],
        prescriptions: ['61d0b4d4ed69c105e8dbf9d8'],
        autresDocuments: [
            {
                nom: 'Lettre d\'orientation',
                url: 'https://exemple.com/lettre-d-orientation.pdf',
                type: 'PDF',
            },
            {
                nom: 'Certificat médical',
                url: 'https://exemple.com/certificat-medical.pdf',
                type: 'PDF',
            },
        ],
    },
];

// Insertion des données dans la collection DossierMedical
DossierMedical.insertMany(DossierMedicalDonnees)
    .then(() => {
        console.log('Données insérées avec succès dans la collection DossierMedical.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection DossierMedical :', erreur);
        mongoose.connection.close();
    });









// Données à insérer dans la collection FichierMedical
const FichierMedicalDonnees = [
    {
        patient: '61d0b4d4ed69c105e8dbf9d6',
        typeFichier: 'Radiographie',
        description: 'Description de la radiographie du patient 1.',
        fichier: 'http://url-du-fichier/radiographie.png',
    },
    {
        patient: '61d0b4d4ed69c105e8dbf9d7',
        typeFichier: 'Analyse de sang',
        description: 'Description de l\'analyse de sang du patient 2.',
        fichier: 'http://url-du-fichier/analyse-de-sang.pdf',
    },
];

// Insertion des données dans la collection FichierMedical
FichierMedical.insertMany(FichierMedicalDonnees)
    .then(() => {
        console.log('Données insérées avec succès dans la collection FichierMedical.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection FichierMedical :', erreur);
        mongoose.connection.close();
    });






// Données à insérer dans la collection Medicament
const donnees4 = [
    {
        nom: 'Paracétamol',
        description: 'Antalgique et antipyrétique.',
        stock: 500,
    },
    {
        nom: 'Ibuprofène',
        description: 'Antalgique, antipyrétique et anti-inflammatoire non stéroïdien.',
        stock: 200,
    },
    {
        nom: 'Amoxicilline',
        description: 'Antibiotique de la famille des pénicillines.',
        stock: 300,
    },
];

// Insertion des données dans la collection Medicament
Medicament.insertMany(donnees4)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Medicament.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Medicament :', erreur);
        mongoose.connection.close();
    });





// Création d'une Facture pour un patient donné
const facture = new Facture({
    medecin: 'id-du-medecin',
    patient: 'id-du-patient',
    montant: 100.0,
    lignesFacturation: [
        {
            consultation: 'id-de-la-consultation-1',
            montant: 50.0,
        },
        {
            consultation: 'id-de-la-consultation-2',
            montant: 50.0,
        },
    ],
});

// Enregistrement de la Facture dans la base de données
facture.save()
    .then(() => {
        console.log('Facture enregistrée avec succès.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'enregistrement de la Facture :', erreur);
        mongoose.connection.close();
    });









// Création d'une Prescription avec références vers des Médicaments existants
const prescription = new Prescription({
    medecin: 'id-du-medecin',
    patient: 'id-du-patient',
    traitements: [
        {
            medicament: 'id-du-medicament-1',
            posologie: '1 comprimé, 3 fois par jour',
        },
        {
            medicament: 'id-du-medicament-2',
            posologie: '2 comprimés, 2 fois par jour',
        },
    ],
    lettreOrientation: '...',
    arretTravail: '...',
    certificatMedical: '...',
});

// Enregistrement de la Prescription dans la base de données
prescription.save()
    .then(() => {
        console.log('Prescription enregistrée avec succès.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'enregistrement de la Prescription :', erreur);
        mongoose.connection.close();
    });





// Données à insérer dans la collection Rendezvous
const donnees5 = [
    {
        medecin: '61d0b4d4ed69c105e8dbf9d2',
        patient: '61d0b4d4ed69c105e8dbf9d6',
        dateDebut: new Date('2023-04-01T09:00:00Z'),
        dateFin: new Date('2023-04-01T09:30:00Z'),
        motif: 'Consultation annuelle',
        statut: 'confirme',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
    {
        medecin: '61d0b4d4ed69c105e8dbf9d3',
        patient: '61d0b4d4ed69c105e8dbf9d6',
        dateDebut: new Date('2023-04-05T14:00:00Z'),
        dateFin: new Date('2023-04-05T14:30:00Z'),
        motif: 'Examen de la peau',
        statut: 'confirme',
        dateCreation: new Date(),
        dateModification: new Date(),
    },
];

// Insertion des données dans la collection Rendezvous
Rendezvous.insertMany(donnees5)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Rendezvous.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Rendezvous :', erreur);
        mongoose.connection.close();
    });








// Données à insérer dans la collection Consultation
const donnees6 = [
    {
        medecin: '61d0b4d4ed69c105e8dbf9d5',
        patient: '61d0b4d4ed69c105e8dbf9d7',
        date: new Date('2022-01-01T11:00:00'),
        description: 'Description de la consultation.',
        diagnostics: 'Diagnostics de la consultation.',
        prescriptions: ['61d0b4d4ed69c105e8dbf9da', '61d0b4d4ed69c105e8dbf9db'],
    },
    {
        medecin: '61d0b4d4ed69c105e8dbf9d5',
        patient: '61d0b4d4ed69c105e8dbf9d8',
        date: new Date('2022-01-02T14:00:00'),
        description: 'Description de la deuxième consultation.',
        diagnostics: 'Diagnostics de la deuxième consultation.',
        prescriptions: ['61d0b4d4ed69c105e8dbf9dc'],
    },
];

// Insertion des données dans la collection Consultation
Consultation.insertMany(donnees6)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Consultation.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Consultation :', erreur);
        mongoose.connection.close();
    });









// Données à insérer dans la collection Notification
const donnees7 = [
    {
        utilisateur: '61d0b4d4ed69c105e8dbf9d4',
        type: 'Rendez-vous',
        message: 'Vous avez un rendez-vous prévu demain à 10h avec le patient 1.',
        dateEnvoi: new Date(),
        lu: false,
    },
    {
        utilisateur: '61d0b4d4ed69c105e8dbf9d6',
        type: 'Facture',
        message: 'Vous avez une facture en attente de paiement pour la consultation du 15 janvier.',
        dateEnvoi: new Date(),
        lu: false,
    },
];

// Insertion des données dans la collection Notification
Notification.insertMany(donnees7)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Notification.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Notification :', erreur);
        mongoose.connection.close();
    });







// Données à insérer dans la collection Traitement
const donnees8 = [
    {
        prescription: '61d0b4d4ed69c105e8dbf9d8',
        medicament: 'Paracétamol',
        dosage: '1g',
        duree: '3 jours',
    },
    {
        prescription: '61d0b4d4ed69c105e8dbf9d9',
        medicament: 'Ibuprofène',
        dosage: '400mg',
        duree: '5 jours',
    },
];

// Insertion des données dans la collection Traitement
Traitement.insertMany(donnees8)
    .then(() => {
        console.log('Données insérées avec succès dans la collection Traitement.');
        mongoose.connection.close();
    })
    .catch((erreur) => {
        console.error('Erreur lors de l\'insertion des données dans la collection Traitement :', erreur);
        mongoose.connection.close();
    });

