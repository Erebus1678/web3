import type { Options } from "swagger-jsdoc";
import swaggerJSDoc from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API", version: "1.0.0" },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./docs/swagger/**/*.ts"], // <- теперь только здесь
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
