const mongoose = require("mongoose");

async function connect() {
  const username = "trongvinh";
  const password = "2905";
  const cluster = "cluster0.fucqrsn";
  const dbname = "ThangLongTourism";

  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = { connect };