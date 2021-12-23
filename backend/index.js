const express = require("express");
const mysql = require("mysql2");
const https = require("https");
var cors = require("cors");
const app = express();
const port = 5050;
const apiKey = "915839a16bf243848d2f";

app.use(cors());
app.use(express.json());

var currencies = ["SEK", "GBP", "EUR", "USD"];
var exchangeRates = { SEK: 1 };

currencies.forEach((currency) => {
  if (currency == "SEK") return;
  const url = `https://free.currconv.com/api/v7/convert?q=${currency}_SEK&compact=ultra&apiKey=${apiKey}`;
  https.get(url, (res) => {
    let body = "";
    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      try {
        const result = JSON.parse(body);
        exchangeRates[currency] = result[`${currency}_SEK`];
      } catch (e) {
        console.log(e);
      }
    });
  });
});

const convertCurrency = (currency, value) => {
  return exchangeRates[currency] * value;
};

var connection = mysql.createConnection({
  host: "localhost",
  user: "auction",
  password: "auction",
  database: "auction",
});

connection.connect((err) => {
  if (err) {
    console.log("Connecting to MySQL failed");
    console.log(err);
  } else {
    console.log("Successful connection to MySQL");
  }
});

app.post("/", (req, res) => {
  let body = req.body;
  const currency = body.currency;
  const value = convertCurrency(parseInt(body.value), currency);
  const sql = `INSERT INTO bids (bid) VALUES (${value})`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Saved to database: {value} SEK`);
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
