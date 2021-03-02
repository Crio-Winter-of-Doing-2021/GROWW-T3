import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 8081;

//  Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Running on port " + port);
});
