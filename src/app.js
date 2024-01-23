const express = require('express');
const hostname = "0.0.0.0";
const port = 3000
const server = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/apinode");
server.use(express.json());
server.use(express.urlencoded());


const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


const option = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Api Node",
        version: "1.0.0",
        description: "A simple API",
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
      components: {
        securitySchemes: {
            AuthToken: {
                type: "apiKey",
                in: "header",
                name: "Authorization"
            },
        },
      },
      security: [
        {
            AuthToken: [],
        },
      ],
    },
    apis: ["./api/routes/*.js"],
  };
  
  const swaggerSpec = swaggerJSDoc(option);
  
  server.use('/api-test', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  


const postRoute = require("./api/routes/postRoute");
postRoute(server);

const commentRoute = require("./api/routes/commentRoute");
commentRoute(server);

const userRoute = require("./api/routes/userRoute");
userRoute(server);



server.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = server;