const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 8000;

/* // MongoDB URI With Username and Password that are stored in environment variable
const uri =
  "mongodb+srv://<username>:<password>@cluster0.bauja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//    Set Up Client With That URI/ User
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); */

app.get("/", (req, res) => {
  console.log("server running");
  res.send("from the server");
});

app.listen(port, () => {
  console.log("Listening to the port", port);
});
