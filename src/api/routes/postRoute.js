module.exports = (server) => {
    const postController = require("../controllers/postController");
    
    server.route("/posts")
    .get(postController.listAllPosts)
    .post(postController.createAPost);

    server.route("/posts/:postId")
    .delete(postController.deletePost);

    server.route("/posts/:postId")
    .put(postController.updatePost);

    server.route("/posts/:postId")
    .get(postController.getPostById);


}