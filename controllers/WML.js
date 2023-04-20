import { refreshToken } from "../controllers/RefreshToken.js";
import Users from "../models/UserModel.js";
import FoodDataSet from "../models/FoodDataSetModel.js";
import UserFoodRanking from "../models/UserFoodRankingModel.js";

export const WML = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    const userfoodranking = await UserFoodRanking.findAll({
      attributes: [
        "userId",
        "rank1",
        "rank2",
        "rank3",
        "rank4",
        "rank5",
        "rank6",
        "rank7",
        "rank8",
        "rank9",
        "rank10",
        "rank11",
        "rank12",
        "rank13",
        "rank14",
        "rank15",
        "rank16",
        "rank17",
        "rank18",
        "rank19",
        "rank20",
      ],
      where: {
        userId: user[0].id,
      },
    });
    let randint = Math.floor(Math.random() * 20 + 1);
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
