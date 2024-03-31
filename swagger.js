const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js API for Nursery Project',
            version: '1.0.0',
        },
        servers: [{
            url: 'http://localhost:8080/',
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./controller/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
