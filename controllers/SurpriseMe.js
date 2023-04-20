import { refreshToken } from "../controllers/RefreshToken.js";
import Users from "../models/UserModel.js";
import FoodDataSet from "../models/FoodDataSetModel.js";
import UserFoodRanking from "../models/UserFoodRankingModel.js";

export const SurpriseMe = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    const userfoodranking = await UserFoodRanking.findAll({
      where: {
        userId: user[0].id,
      },
    });
    let randint = Math.floor(Math.random() * 50 + 1);
    const foodchoiceid = userfoodranking[0]["rank" + randint];
    const foodchoice = await FoodDataSet.findAll({
      where: {
        id: foodchoiceid,
      },
    });
    return res.status(200).json({ foodchoice });
  } catch (error) {
    console.log(error);
  }
};
