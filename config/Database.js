import { Sequelize } from "sequelize";

const db = new Sequelize("whatsmylunch_db", "root", "password", {
  //FOR CLOUD - username: user password:password
  host: "localhost",
  dialect: "mysql",
});

export default db;
