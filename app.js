const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require('morgan');
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

require("./db/conn");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./frontend/build')))

const User = require("./model/userSchema");
const subGreddiitSchema = require("./model/subgreddiitSchema");

app.get("/api/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send(err);
    return res.send(users);
  });
});

app.get("/api/fsubgreddiits", (req, res) => {
  subGreddiitSchema.find({}, (err, subgreddiits) => {
    if (err) return res.status(500).send(err);
    return res.send(subgreddiits);
  });
});

app.use(require("./router/auth"));
// app.get('/about', (req, res) => {
//     res.send("Welcome to about page");
// })

app.use("*", function (req, res){
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
})

app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV} mode at port ${PORT}`);
});
