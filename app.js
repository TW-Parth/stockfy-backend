const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth.route");
const multer = require("multer");

const PORT = 20820;

const app = express();

app.use(multer().any());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
