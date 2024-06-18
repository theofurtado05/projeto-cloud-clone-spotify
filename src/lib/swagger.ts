import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
      apiFolder: 'src/app/api/', 
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Theofy - API',
          version: '1.0',
          description: 'O melhor streaming de músicas desse Brasil Varonil!', 
        },
        components: {
          securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
      tagging: true, // Habilita a agrupação por tags
    });
    return spec;
  };
  