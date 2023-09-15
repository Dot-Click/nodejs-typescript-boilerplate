import http from "http";
import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config({ path: "./src/config/config.env" });

// Server setup
const PORT: number = Number(process.env.PORT) || 8001;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
