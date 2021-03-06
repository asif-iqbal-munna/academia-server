const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI With Username and Password that are stored in environment variable
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bauja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//    Set Up Client With That URI/ User
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    await client.connect();
    const database = client.db("OnlinePrograms");
    const programCollection = database.collection("Programs");

    // const result = await courseCollection.insertOne("hi there");
    //  Posting programs information to the database
    app.post("/programs", async (req, res) => {
      const program = req.body;
      const result = await programCollection.insertOne(program);
      res.send(result);
    });

    app.get("/programs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await programCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // Set programs information to the server
    app.get("/programs", async (req, res) => {
      const programs = await programCollection.find({}).toArray();
      res.send(programs);
    });
  } finally {
    // await client.close();
  }
};

run().catch(console.dir);

//  Tested if working in local server
app.get("/", (req, res) => {
  console.log("server running");
  res.send("from the server");
});

app.listen(port, () => {
  console.log("Listening to the port", port);
});
 