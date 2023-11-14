const express = require('express');
const hostname = "0.0.0.0";
const port = 3000

const server = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/apinode");

server.use(express.json());
server.use(express.urlencoded());


const postRoute = require("./api/routes/postRoute");
postRoute(server);

const commentRoute = require("./api/routes/commentRoute");
commentRoute(server);


server.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})