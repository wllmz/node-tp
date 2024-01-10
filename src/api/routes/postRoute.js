module.exports = (server) => {
    const postController = require("../controllers/postController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");
    const { requireAdminRole } = require("../middleware/authJwt");

    /**
     * @swagger
     * /posts:
     *   get:
     *     security:
     *       - AuthToken: []
     *     summary: Liste de tous les posts
     *     tags: [Posts]
     *     responses:
     *       200:
     *         description: Liste des posts
     *       401:
     *         description: Non autorisé
     */
    server.route("/posts")
        .get(jwtverifytoken.verifyToken, postController.listAllPosts)

    /**
     * @swagger
     * /posts:
     *   post:
     *     security:
     *       - AuthToken: []
     *     summary: Crée un nouveau post
     *     tags: [Posts]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               content:
     *                 type: string
     *     responses:
     *       201:
     *         description: Post créé
     *       401:
     *         description: Non autorisé
     */
        .post(jwtverifytoken.verifyToken, requireAdminRole, postController.createAPost);

    /**
     * @swagger
     * /posts/{postId}:
     *   delete:
     *     security:
     *       - AuthToken: []
     *     summary: Supprime un post
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: postId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID du post
     *     responses:
     *       200:
     *         description: Post supprimé
     *       401:
     *         description: Non autorisé
     */
    server.route("/posts/:postId")
        .delete(jwtverifytoken.verifyToken, requireAdminRole, postController.deletePost)

    /**
     * @swagger
     * /posts/{postId}:
     *   put:
     *     security:
     *       - AuthToken: []
     *     summary: Met à jour un post
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: postId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID du post
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               content:
     *                 type: string
     *     responses:
     *       200:
     *         description: Post mis à jour
     *       401:
     *         description: Non autorisé
     */
        .put(jwtverifytoken.verifyToken, requireAdminRole, postController.updatePost)

    /**
     * @swagger
     * /posts/{postId}:
     *   get:
     *     security:
     *       - AuthToken: []
     *     summary: Récupère un post par son ID
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: postId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID du post
     *     responses:
     *       200:
     *         description: Détails du post
     *       401:
     *         description: Non autorisé
     */
        .get(jwtverifytoken.verifyToken, requireAdminRole, postController.getPostById);

}
