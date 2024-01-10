module.exports = (server) => {
    const commentController = require("../controllers/commentController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");
    const { requireAdminRole } = require("../middleware/authJwt");
 
    /**
     * @swagger
     * /posts/{postId}/comments:
     *   get:
     *     security:
     *       - AuthToken: []
     *     summary: Liste tous les commentaires d'un post
     *     tags: [Comments]
     *     parameters:
     *       - in: path
     *         name: postId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID du post
     *     responses:
     *       200:
     *         description: Liste de commentaires
     *       401:
     *         description: Non autorisé
     */
    server.route('/posts/:postId/comments')
        .get(jwtverifytoken.verifyToken, commentController.listAllComments)

    /**
     * @swagger
     * /posts/{postId}/comments:
     *   post:
     *     security:
     *       - AuthToken: []
     *     summary: Crée un nouveau commentaire
     *     tags: [Comments]
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
     *               commentaire:
     *                 type: string
     *                 description: Texte du commentaire
     *     responses:
     *       201:
     *         description: Commentaire créé
     *       401:
     *         description: Non autorisé
     */
        .post(jwtverifytoken.verifyToken, requireAdminRole, commentController.createAComment);

    /**
     * @swagger
     * /comments/{commentId}:
     *   delete:
     *     security:
     *       - AuthToken: []
     *     summary: Supprime un commentaire
     *     tags: [Comments]
     *     parameters:
     *       - in: path
     *         name: commentId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID du commentaire
     *     responses:
     *       200:
     *         description: Commentaire supprimé
     *       401:
     *         description: Non autorisé
     */
    server.route("/comments/:commentId")
        .delete(jwtverifytoken.verifyToken, requireAdminRole, commentController.deleteComment)

    /**
     * @swagger
     * /comments/{commentId}:
     *   put:
     *     security:
     *       - AuthToken: []
     *     summary: Met à jour un commentaire
     *     tags: [Comments]
     *     parameters:
     *       - in: path
     *         name: commentId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID du commentaire
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               commentaire:
     *                 type: string
     *                 description: Nouveau texte du commentaire
     *     responses:
     *       200:
     *         description: Commentaire mis à jour
     *       401:
     *         description: Non autorisé
     */
        .put(jwtverifytoken.verifyToken, requireAdminRole, commentController.updateComment)

    /**
     * @swagger
     * /comments/{commentId}:
     *   get:
     *     security:
     *       - AuthToken: []
     *     summary: Récupère un commentaire par son ID
     *     tags: [Comments]
     *     parameters:
     *       - in: path
     *         name: commentId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID du commentaire
     *     responses:
     *       200:
     *         description: Détails du commentaire
     *       401:
     *         description: Non autorisé
     */
        .get(jwtverifytoken.verifyToken, requireAdminRole, commentController.getCommentById);
};
