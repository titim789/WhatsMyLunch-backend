import UserTopFoodChoice from "../models/UserTopFoodChoiceModel.js";
import Users from "../models/UserModel.js";
import { Op, fn, col, where } from "sequelize";
import FoodDataSet from "../models/FoodDataSetModel.js";
import TastePalette from "../models/TastePaletteModel.js";
import UserFoodRanking from "../models/UserFoodRankingModel.js";

export const getUsersTastePalette = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    const tastepalette = await TastePalette.findAll({
      attributes: ["sweet", "salty", "spicy", "bitter", "umami", "sour"],
      where: {
        userId: user[0].dataValues.id,
      },
    });

    return res.status(200).json({ tastepalette });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
};
