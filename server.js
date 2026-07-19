const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const Quote = require("./models/Quote");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/QuoteDB")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log(err);
});

app.get("/quote", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/quotes/random");

console.log(response.data);

const newQuote = new Quote({
    quote: response.data.quote,
    author: response.data.author
});

    await newQuote.save();

    res.json(newQuote);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching quote" });
}
});
app.get("/history", async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: "Error loading history" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});