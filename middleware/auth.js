const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Utilisateur.model');

const secret = 'votre-secret-ici';

// Fonction pour générer un token JWT
const generateToken = (user) => {
    const payload = {
        _id: user._id,
        role: user.role
    };

    const options = {
        expiresIn: '1h'
    };

    const token = jwt.sign(payload, secret, options);
    return token;
};

// Fonction pour vérifier le mot de passe de l'utilisateur
const verifyPassword = async (password, user) => {
    return await bcrypt.compare(password, user.motDePasse);
};


// Fonction pour chiffrer le mot de passe de l'utilisateur
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Middleware pour gérer la connexion de l'utilisateur
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Recherche de l'utilisateur par email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Email ou mot de passe invalide." });
        }

        // Vérification du mot de passe
        const isValidPassword = await verifyPassword(password, user);

        if (!isValidPassword) {
            return res.status(401).json({ error: "Email ou mot de passe invalide." });
        }

        // Génération du token JWT
        const token = generateToken(user);

        // Enregistrer le token dans la base de données pour la validation ultérieure (facultatif)
        user.token = token;
        await user.save();

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Erreur du serveur." });
    }
};

module.exports = {
    login,
    secret,
    hashPassword
};
