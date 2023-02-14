const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//router imports
const userRoutes = require("./routes/UserRoute");
const todoRoutes = require("./routes/TaskRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);

app.get("", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    }

    console.log("Database connected");
  }
);
