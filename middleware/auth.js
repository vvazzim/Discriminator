const jwt = require('jsonwebtoken');
const User = require('../models/Utilisateur.model');
const secret = 'votre-secret-ici';

const authenticate = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, secret);
            const user = await User.findOne({ _id: decoded._id, token: token });

            if (!user) {
                throw new Error();
            }

            if (roles && roles.indexOf(decoded.role) === -1) {
                return res.status(403).send({ error: "Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource." });
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401).send({ error: "Veuillez vous authentifier." });
        }
    };
};

module.exports = authenticate;
