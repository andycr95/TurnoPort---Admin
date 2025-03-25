// Load environment variables from a .env file
import dotenv from "dotenv";
dotenv.config();

// Define your configuration object
const config = {
  // API configuration
  api: {
    port: parseInt(process.env.API_PORT!) || 3000,
    secretKey: process.env.SECRET || "mysecretkey",
  },

  // Other configuration options...

  env: process.env.NODE_ENV || "development",
};

export default config;
