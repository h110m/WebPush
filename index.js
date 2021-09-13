const express = require("express");
const app = express();
const api = require("./API/backend");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(api.module);

app.use(express.static("./web/build"));

app.listen(80, () => console.log("Server is listening..."));