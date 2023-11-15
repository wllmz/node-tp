module.exports = (server) => {
    const commentController = require("../controllers/commentController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");
    const { requireAdminRole } = require("../middleware/authJwt");
 
    server.route('/posts/:postId/comments')
        .get(jwtverifytoken.verifyToken, commentController.listAllComments)
        .post(jwtverifytoken.verifyToken,requireAdminRole, commentController.createAComment);

    server.route("/comments/:commentId")
    .delete(jwtverifytoken.verifyToken,requireAdminRole, commentController.deleteComment)
    .put(jwtverifytoken.verifyToken,requireAdminRole, commentController.updateComment)
    .get(jwtverifytoken.verifyToken,requireAdminRole, commentController.getCommentById);
};
