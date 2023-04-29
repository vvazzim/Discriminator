const MongoClient = require('mongodb').MongoClient;


const url = 'mongodb://<username>:<password>@localhost:27017/?authSource=<dbname>';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Erreur lors de la connexion à MongoDB:', err);
        return;
    }
    console.log('Connecté avec succès à MongoDB');
    client.close();
});
