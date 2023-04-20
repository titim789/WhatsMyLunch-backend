import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const FoodDataSet = db.define(
  "fooddataset",
  {
    name: {
      type: DataTypes.STRING,
    },
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
    colours: {
      type: DataTypes.STRING,
    },
    cuisine: {
      type: DataTypes.STRING,
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

export default FoodDataSet;
