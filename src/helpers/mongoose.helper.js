const mongoose = require("mongoose");
const { mongoUrl } = require("../config/config.json");

const primaryObj = new mongoose.Mongoose();

const primaryConnection = primaryObj.createConnection(mongoUrl);

primaryConnection.on("open", () => {
  console.log("Primary database connected");
});
primaryConnection.on("error", (e) => {
  console.log("Primary database connection error.");
  console.log(e);
});

module.exports = {
  primaryConnection,
};
