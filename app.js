const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');


// Importing routes
var indexRouter = require('./routes/index');
const agendasRouter = require('./routes/Agenda.Routes');
const archiveRouter = require('./routes/Archive.Routes');
const cabinetMedicalRoutes = require('./routes/CabinetMedical.Routes');
const consultationRouter = require('./routes/Consultation.Routes');
const cabinetMedicalRouter = require('./routes/CabinetMedical.Routes');
const dossierMedicalRouter = require('./routes/DossierMedical.Routes');
const utilisateurRouter = require('./routes/Utilisateur.Routes');
const fichiermedicalRouter = require('./routes/FichierMedical.Routes');
const rdvRouter = require('./routes/RDV.Routes');
const auditRouter = require('./routes/Audit.Routes');


const app = express();

const url = "mongodb://127.0.0.1:27017/DBMediCall";

// Connect to database
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log(url);
  console.log('The DataBase is connected with the server nowww ');
}).catch((err) => {
  console.log("Mongoose Connection Error =", err.message);
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const allowedOrigins = ['http://localhost:3000', 'http://projet-pfe-lemon.vercel.app','http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));



// Routes
app.use('/', indexRouter);
app.use('/archive', archiveRouter);
app.use('/agendas', agendasRouter);
app.use('/cabinet-medical', cabinetMedicalRoutes);
app.use('/consultation', consultationRouter);
app.use('/cabinetMedical', cabinetMedicalRouter);
app.use('/fichiermedical', fichiermedicalRouter);
app.use('/DossierMedical', dossierMedicalRouter);
app.use('/Utilisateur', utilisateurRouter);
app.use('/Rdv', rdvRouter);
app.use('/Audit', auditRouter);


app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  console.log('Request body:', req.body);
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error("Error details:", err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
