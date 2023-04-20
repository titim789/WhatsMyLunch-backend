import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "../models/UserModel.js";

const { DataTypes } = Sequelize;

const UserFoodRanking = db.define(
  "userfoodranking",
  {
    rank1: {
      type: DataTypes.INTEGER,
    },
    rank2: {
      type: DataTypes.INTEGER,
    },
    rank3: {
      type: DataTypes.INTEGER,
    },
    rank4: {
      type: DataTypes.INTEGER,
    },
    rank5: {
      type: DataTypes.INTEGER,
    },
    rank6: {
      type: DataTypes.INTEGER,
    },
    rank7: {
      type: DataTypes.INTEGER,
    },
    rank8: {
      type: DataTypes.INTEGER,
    },
    rank9: {
      type: DataTypes.INTEGER,
    },
    rank10: {
      type: DataTypes.INTEGER,
    },
    rank11: {
      type: DataTypes.INTEGER,
    },
    rank12: {
      type: DataTypes.INTEGER,
    },
    rank13: {
      type: DataTypes.INTEGER,
    },
    rank14: {
      type: DataTypes.INTEGER,
    },
    rank15: {
      type: DataTypes.INTEGER,
    },
    rank16: {
      type: DataTypes.INTEGER,
    },
    rank17: {
      type: DataTypes.INTEGER,
    },
    rank18: {
      type: DataTypes.INTEGER,
    },
    rank19: {
      type: DataTypes.INTEGER,
    },
    rank20: {
      type: DataTypes.INTEGER,
    },
    rank21: {
      type: DataTypes.INTEGER,
    },
    rank22: {
      type: DataTypes.INTEGER,
    },
    rank23: {
      type: DataTypes.INTEGER,
    },
    rank24: {
      type: DataTypes.INTEGER,
    },
    rank25: {
      type: DataTypes.INTEGER,
    },
    rank26: {
      type: DataTypes.INTEGER,
    },
    rank27: {
      type: DataTypes.INTEGER,
    },
    rank28: {
      type: DataTypes.INTEGER,
    },
    rank29: {
      type: DataTypes.INTEGER,
    },
    rank30: {
      type: DataTypes.INTEGER,
    },
    rank31: {
      type: DataTypes.INTEGER,
    },
    rank32: {
      type: DataTypes.INTEGER,
    },
    rank33: {
      type: DataTypes.INTEGER,
    },
    rank34: {
      type: DataTypes.INTEGER,
    },
    rank35: {
      type: DataTypes.INTEGER,
    },
    rank36: {
      type: DataTypes.INTEGER,
    },
    rank37: {
      type: DataTypes.INTEGER,
    },
    rank38: {
      type: DataTypes.INTEGER,
    },
    rank39: {
      type: DataTypes.INTEGER,
    },
    rank40: {
      type: DataTypes.INTEGER,
    },
    rank41: {
      type: DataTypes.INTEGER,
    },
    rank42: {
      type: DataTypes.INTEGER,
    },
    rank43: {
      type: DataTypes.INTEGER,
    },
    rank44: {
      type: DataTypes.INTEGER,
    },
    rank45: {
      type: DataTypes.INTEGER,
    },
    rank46: {
      type: DataTypes.INTEGER,
    },
    rank47: {
      type: DataTypes.INTEGER,
    },
    rank48: {
      type: DataTypes.INTEGER,
    },
    rank49: {
      type: DataTypes.INTEGER,
    },
    rank50: {
      type: DataTypes.INTEGER,
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

UserFoodRanking.belongsTo(Users);
export default UserFoodRanking;
