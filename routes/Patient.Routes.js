const express = require('express');
const router = express.Router();
const patientCtrl = require('../Controlers/Patient.Controler');

// Récupérer la liste des patients
router.get('/', patientCtrl.getListePatients);

// Récupérer un patient par son identifiant
router.get('/:id', patientCtrl.getPatientById);

// Ajouter un nouveau patient
router.post('/', patientCtrl.ajouterPatient);

// Modifier les informations d'un patient
router.put('/:id', patientCtrl.modifierPatient);

// Supprimer un patient
router.delete('/:id', patientCtrl.supprimerPatient);

module.exports = router;
