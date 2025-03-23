const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'User API',
        description: 'API for user management.',
        version: '1.0.0'
    },
    host: 'localhost:8080',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/users.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server'); // Garante que o servidor inicie após a geração do Swagger
});
