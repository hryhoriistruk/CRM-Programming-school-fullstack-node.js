import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const options: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Документація API для вашого проєкту",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "john.doe@example.com",
            },
            role: {
              type: "string",
              example: "user",
            },
            password: {
              type: "string",
              example: "strongPassword123",
            },
          },
          required: ["name", "email", "role", "password"],
        },
        UserCredentials: {
          type: "object",
          properties: {
            email: {
              type: "string",
              example: "user@example.com",
            },
            password: {
              type: "string",
              example: "strongPassword123",
            },
          },
        },
        AdminCredentials: {
          type: "object",
          properties: {
            email: {
              type: "string",
              example: "admin@example.com",
            },
            password: {
              type: "string",
              example: "adminPassword123",
            },
          },
        },
        RefreshToken: {
          type: "object",
          properties: {
            refreshToken: {
              type: "string",
              example: "abc123refreshTokenExample",
            },
          },
        },
        Token: {
          type: "object",
          properties: {
            accessToken: {
              type: "string",
              description: "Токен доступу для авторизації",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            refreshToken: {
              type: "string",
              description: "Токен для оновлення доступу",
              example: "dGhpc0lzUmVmcmVzaFRva2VuRW1hcGxl",
            },
            _userId: {
              type: "string",
              description: "ID користувача, пов’язаний з токеном",
              example: "60a1f76d8b4e5b3f988fdd54",
            },
          },
          required: ["accessToken", "refreshToken", "_userId"],
        },
      },
    },
  },
  apis: ["./src/routers/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
