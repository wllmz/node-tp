module.exports = (server) => {
    const commentController = require("../controllers/commentController");
    
 
    server.route('/posts/:postId/comments')
        .get(commentController.listAllComments)
        .post(commentController.createAComment);

    server.route("/comments/:commentId")
    .delete(commentController.deleteComment)
    .put(commentController.updateComment)
    .get(commentController.getCommentById);
};
