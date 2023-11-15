const User = require("../models/userModel");


exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "L'email est déjà utilisé" });
        }
        const newUser = new User({
            email,
            password,
        });
        await newUser.save();

        res.status(201).json({ message: "Utilisateur enregistré avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
    }
};



exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        res.status(200).json({ message: "Connexion réussie", user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};