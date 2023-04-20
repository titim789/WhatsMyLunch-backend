import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "../models/UserModel.js";

const { DataTypes } = Sequelize;

const TastePalette = db.define(
  "tastepalette",
  {
    sweet: {
      type: DataTypes.FLOAT,
    },
    salty: {
      type: DataTypes.FLOAT,
    },
    spicy: {
      type: DataTypes.FLOAT,
    },
    bitter: {
      type: DataTypes.FLOAT,
    },
    umami: {
      type: DataTypes.FLOAT,
    },
    sour: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

TastePalette.belongsTo(Users);
export default TastePalette;
