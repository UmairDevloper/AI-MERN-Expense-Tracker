const express = require("express");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");

// connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions));
//? routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//? error handlers
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
