module.exports = (server) => {
    const postController = require("../controllers/postController");
    const jwtverifytoken = require("../middleware/jwtMiddleware");
    const { requireAdminRole } = require("../middleware/authJwt");
    
    server.route("/posts")
    .get(jwtverifytoken.verifyToken, postController.listAllPosts)
    .post(jwtverifytoken.verifyToken,requireAdminRole, postController.createAPost);

    server.route("/posts/:postId")
    .delete(jwtverifytoken.verifyToken,requireAdminRole, postController.deletePost)
    .put(jwtverifytoken.verifyToken,requireAdminRole, postController.updatePost)
    .get(jwtverifytoken.verifyToken,requireAdminRole, postController.getPostById);


}