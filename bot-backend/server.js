import chalk from "chalk";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import config from "./config";

const app = express();
const mongoURI = config.MONGO_URI;
const port = process.env.PORT || 8080;

//  Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(chalk.blue("MongoDB Connected")))
    .catch((err) =>
        console.log(chalk.red("Database Connection Error: " + err))
    );

app.listen(port, () => {
    console.log(chalk.blue("Running on port: ") + port);
});
