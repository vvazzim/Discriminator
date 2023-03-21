var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const Patient = require('./models/Patient.model');
const Medecin = require('./models/Medecin.model');
const Facture = require('./models/Facture.model');
const DossierMedical = require('./models/DossierMedical.model');
const Consultation = require('./models/Consultation.model');
const CabinetMedical = require('./models/CabinetMedical.model');
const rdv = require('./models/RDV.model');
const Prescription = require('./models/Prescription.model');
const Traitement = require('./models/Traitement.model');
const Utilisateur = require('./models/Utilisateur.model');
const Assistant = require('./models/Assistant.model');

mongoose.set('strictQuery', false);
const ObjectId = mongoose.Types.ObjectId;


var app = express();


// Connect to database
const url ='mongodb://127.0.0.1:27017/DBMediCall' ;
const connect = mongoose.connect(url );
connect.then((db)=>{
  console.log(url);
  console.log('The DataBase is connected with the server now ')
}).catch((err)=>{
  console.log("Mongoose Connection Error =" , err.message)
});


// Create and save new medecin
const newMedecin = new Medecin({
  id_Medecin: '0001',
  specialite: 'Dermatologie',
  adresse: 'Cité Bordj El Kiffan',
  telephone: '0796133284',
  experience: '15'
});

newMedecin.save()
    .then(() => console.log('Medecin saved'))
    .catch((err) => console.log(err));

// Create and save new Facture
const newFacture = new Facture({
  id_facture: '0001',
  date_facture: new Date("2023-02-02"),
  montant: '200 000.00',
  consultation: '0001'});

newFacture.save()
    .then(() => console.log('Facture saved'))
    .catch((err) => console.log(err));





// Create and save new Patient
const newPatient = new Patient({
  id: '0001',
  nom: 'CHIKHI',
  prenom: 'Wassim',
  date_naissance: new Date("2001-02-14"),
  email: 'chikhimedwassim@gmail.com',
  tel: '0796133284',
  adresse: 'Cite 93',
});

newPatient.save()
    .then(() => console.log('Patient saved'))
    .catch((err) => console.log(err));












// Create and save new rendezVous
const newTraitement = new Traitement({
  id: '0001',
  medicament: 'a3tiwlo doliprane',
  posologie: 'ma3ando Walo',
});

newTraitement.save()
    .then(() => console.log('Traitement saved'))
    .catch((err) => console.log(err));

// Create and save new rendezVous
const newUtilisateur = new Utilisateur({
  id: '0001',
  nom: 'Khalil',
  prenom:'chakib',
  email: 'Chzkibkhalil@gmail.com',
  mot_de_passe: 'bdefg02'
});

newUtilisateur.save()
    .then(() => console.log('Utilisateur saved'))
    .catch((err) => console.log(err));











// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
