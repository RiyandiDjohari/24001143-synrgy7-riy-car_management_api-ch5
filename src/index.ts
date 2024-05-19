import express, { Express } from "express";
import router from "./routes";
import dotenv from "dotenv";
import knex from "knex";
import { Model } from "objection";
import config from "../knexfile";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const environment = process.env.ENVIRONMENT || "development";
const knexInstance = knex(config[environment]);

Model.knex(knexInstance);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});