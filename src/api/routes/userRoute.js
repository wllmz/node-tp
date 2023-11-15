module.exports = (server) => {
    const userController = require("../controllers/userController");

    server.route("/signin")
    .post(userController.signin);


    server.route("/register")
    .post(userController.register);

}