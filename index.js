const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => { console.error(err) });

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute)

const port = process.env.API_PORT || 3001;
app.listen(port, ()=> console.log(`Backend server is running at ${port}`))
