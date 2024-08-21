import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Swagger definition
const port = process.env.PORT
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'NFT DApp API',
            version: '1.0.0',
            description: 'API documentation for the NFT DApp',
        },
        servers: [
            {
                url: 'http://localhost:' + port, // Change to your server URL
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/router.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
