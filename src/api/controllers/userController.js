const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const newUser = new User({
      email,
      password,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
  }
};


exports.userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.email === req.body.email && user.password === req.body.password) {
      const userData = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      const token = await jwt.sign(
        userData,
        process.env.JWT_KEY,
        { expiresIn:  "30 days" }
      );
      res.status(200).json({token});
    }else {
        res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur s'est produite lors du traitement" });
  }
};
