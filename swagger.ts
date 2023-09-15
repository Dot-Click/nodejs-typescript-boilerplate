import swaggerAutogen from "swagger-autogen";

interface SwaggerDoc {
  info: {
    title: string;
    description: string;
    version: string;
  };
  host: string;
  basePath: string;
  schemes: string[];
  consumes: string[];
  produces: string[];
  tags: any[];
}

const doc: SwaggerDoc = {
  info: {
    title: "Time2Clean",
    description: "Time2Clean api endpoints",
    version: "1.0.0",
  },
  host: "localhost:8001",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [],
};

const swaggerAutogenInstance = swaggerAutogen();
const outputFile = "./swagger_output.json"; // Generated Swagger file
const endpointsFiles = ["./src/router/index.ts"]; // Path to the API route files

swaggerAutogenInstance(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger file generated");
});
