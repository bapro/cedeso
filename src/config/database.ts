import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  dialect: "mysql",
  logging: isProduction ? false : console.log,
  models: [__dirname + "/../models/**/*.ts"],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

export default sequelize;
