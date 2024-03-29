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
    },
    apis: ['./controller/*js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
