module.exports = (server) => {
    const userController = require("../controllers/userController");
  

    // Route pour l'inscription
    server.route("/register")
        .post(userController.register);

    // Route pour la connexion
    server.route("/signin")
        .post(userController.userLogin );
};
