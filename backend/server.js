
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Contact from "./models/Contact.js";

dotenv.config({ path: "backend/.env" });
const app = express();
const PORT = process.env.PORT || 3000;


// Allow frontend requests
app.use(cors());

// Read JSON data from requests
app.use(express.json());

// Read form data
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Contact Form API is running!"
  });
});




app.post("/submit-contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully!"
    });

  } catch (error) {
    console.error("Error submitting contact:", error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong."
    });
  }
});





app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json({
      success: true,
      contacts
    });

  } catch (error) {
    console.error("Error fetching contacts:", error.message);

    res.status(500).json({
      success: false,
      message: "Could not fetch contacts."
    });
  }
});



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });