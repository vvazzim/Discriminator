const bcrypt = require('bcrypt');
const { Utilisateur, Patient, Medecin, Assistant } = require('../models/Utilisateur.model.js');
const jwt = require('jsonwebtoken');

const secret = 'votre-secret-ici';

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

const verifyPassword = async (password, user) => {
    // Si le mot de passe de l'utilisateur n'est pas chiffré, comparez simplement les mots de passe en clair
    if (!user.motDePasse.startsWith("$2b$") && !user.motDePasse.startsWith("$2a$")) {
        return password === user.motDePasse;
    }

    // Si le mot de passe de l'utilisateur est chiffré, utilisez bcrypt pour le vérifier
    return await bcrypt.compare(password, user.motDePasse);
};


const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(`Trying to login with email: ${email}`);

        const user = await Utilisateur.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Email ou mot de passe invalide." });
        }

        const isValidPassword = await verifyPassword(password, user);

        if (!isValidPassword) {
            return res.status(401).json({ error: "Email ou mot de passe invalide." });
        }

        const token = generateToken(user);
        user.token = token;
        await user.save();

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur du serveur." });
    }
};

const authenticate = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token provided" });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Not authorized, token failed verification" });
        } else {
            req.auth = decoded;
            next();
        }
    });
};

const hasAuthorization = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        authenticate,
        (req, res, next) => {
            if (roles.length && !roles.includes(req.auth.role)) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            next();
        }
    ];
};



async function register(email, password, nom, prenom, telephone, adresse, typeUtilisateur) {
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, nom, prenom, telephone, adresse, typeUtilisateur })
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('token', data.token);
    }

    return data;
}




module.exports = {
    login,
    register,
    secret,
    hashPassword,
    authenticate,
    hasAuthorization
};
