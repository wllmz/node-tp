module.exports = (server) => {
    const postController = require("../controllers/postController");
    
    server.route("/posts")
    .get(postController.listAllPosts)
    .post(postController.createAPost);

    server.route("/posts/:postId")
    .delete(postController.deletePost)
    .put(postController.updatePost)
    .get(postController.getPostById);


}