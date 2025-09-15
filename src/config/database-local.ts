import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Incident, Profile, Capture } from "../models";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  dialect: "mysql",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  models: [Incident, Profile, Capture], // Register models here
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
