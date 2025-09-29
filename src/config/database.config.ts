import mongoose from "mongoose";

// Define Category schema
export const categorySchema = new mongoose.Schema({
       name: {type: String, required: true, unique: true},
})



// Create Category model
export const CategoryModel = mongoose.model("Category", categorySchema);
