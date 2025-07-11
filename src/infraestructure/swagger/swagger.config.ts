import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OTP Token API',
      version: '1.0.0',
      description: 'Simple API to generate and validate OTP tokens',
    },
  },
  apis: ['src/presentation/routes/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);