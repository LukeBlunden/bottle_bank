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

app.use("/api/lists/", require("./routes/api/lists"));

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server started on ${port}`));
