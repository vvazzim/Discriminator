const express = require('express');
const router = express.Router();

const archiveController = require('../Controlers/Archive.Controler');

// Obtenir tous les archives
router.get('/', archiveController.getArchives);

// Obtenir un archive spécifique
router.get('/:id', archiveController.getArchiveById);

// Ajouter un nouveau archive
router.post('/', archiveController.addArchive);

// Mettre à jour un archive existant
router.put('/:id', archiveController.updateArchive);

// Supprimer un archive
router.delete('/:id', archiveController.deleteArchive);

module.exports = router;
