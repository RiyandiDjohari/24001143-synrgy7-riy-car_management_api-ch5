import express, { Express } from "express";
import router from "./routes";
import dotenv from "dotenv";
import knex from "knex";
import { Model } from "objection";
import config from "../knexfile";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const environment = process.env.ENVIRONMENT || "development";
const knexInstance = knex(config[environment]);

Model.knex(knexInstance);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
