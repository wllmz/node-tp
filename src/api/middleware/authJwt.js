

exports.requireAdminRole = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // Continuer si l'utilisateur est un administrateur
    } else {
        res.status(403).json({ message: "Accès refusé : nécessite le rôle d'administrateur" });
    }
};
