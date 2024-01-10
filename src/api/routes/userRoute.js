module.exports = (server) => {
    const userController = require("../controllers/userController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");
    const { requireAdminRole } = require("../middleware/authJwt");

    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Inscription d'un nouvel utilisateur
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - email
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Utilisateur enregistré
     */
    server.route("/register")
        .post(userController.register);

    /**
     * @swagger
     * /signin:
     *   post:
     *     summary: Connexion de l'utilisateur
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Connexion réussie
     */
    server.route("/signin")
        .post(userController.userLogin);

    /**
     * @swagger
     * /alluser:
     *   get:
     *     security:
     *       - AuthToken: []
     *     summary: Liste de tous les utilisateurs
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Liste des utilisateurs
     *       401:
     *         description: Non autorisé
     */
    server.route("/alluser")
        .get(jwtverifytoken.verifyToken, requireAdminRole, userController.Alluser);
};
