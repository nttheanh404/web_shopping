const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./src/config/connectDB");
db.connect();

const route = require("./src/routes/index");
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", route);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
