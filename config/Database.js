import { Sequelize } from "sequelize";

const db = new Sequelize("whatsmylunch_db", "root", "", {
  host: "18.136.194.66",
  dialect: "mysql",
});

export default db;
