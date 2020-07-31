const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

// Parses incoming requests with Json payloads
// app.use(express.json());
app.use(bodyParser.json());

const db = config.get("mongoURI");

mongoose.set("useFindAndModify", false);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo database connected"))
  .catch((err) => console.log("DB connection error: ", err));

app.use("/api/expenses", require("./routes/api/expenses"));
app.use("/api/income", require("./routes/api/income"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve  static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set a static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
