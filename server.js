const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoute");
const  cors = require("cors");

dotenv.config();
 
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users",userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running ${PORT}"));
