import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const url = `mongodb+srv://harsh:${process.env.PASSWORD}@social.kvqufpx.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "wallpaper";
const client = new MongoClient(url);
async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
main();
app.post("/getdata", async (req, res) => {
  try {
    const db = client.db(dbName);
    const category = req.query.category;
    if (!category) {
      return res
        .status(400)
        .json({ error: "Category is required in the request body" });
    }

    const collection = db.collection(category);
    const result = await collection.find().toArray();

    res.json({ category: result });
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
