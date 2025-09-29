import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import { BASE_ROUTE } from "@/constants/index.js";
import { CategoryModel } from "@config/database.config.js";

// Load environment variables from .env file
dotenv.config({path: ".env"});

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.DATABASE_URL!).then(({ connection }) => {
       console.log("Connected to MongoDB database:", connection.name);
}).catch(error => {
       console.error("Error connecting to MongoDB:", error);
       process.exit(1); // Exit the application if the database connection fails
})

// Create Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

if (process.env.ENVIRONMENT === "development")
       app.use(morgan("dev"));

// Redirect root route to /api/v1
app.get("/", (request:Request, response:Response) => {
       response.redirect(BASE_ROUTE)
});

// Main API route
app.get(BASE_ROUTE, (request:Request, response:Response) => {
       response.send("Welcome to E-commerce API v1");
});

app.post(BASE_ROUTE, (request:Request, response:Response) => {
       const name = request.body.name;
       response.send(`Category name: ${name}`);

       const category = new CategoryModel({ name });
       category.save().then(() => {
              console.log("Category saved:", category);
       }).catch(error => {
              console.error("Error saving category:", error);
       });
})

// Start server and listen on the defined port
app.listen(process.env.PORT ?? 3000, () => {
       console.clear();
       console.log(`\nServer is running on http://localhost:${process.env.PORT ?? 3000}`);
});

