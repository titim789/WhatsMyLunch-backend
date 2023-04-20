import Users from "../models/UserModel.js";
import FoodDataSet from "../models/FoodDataSetModel.js";

export const getFoodDataSet = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (user === null) return res.sendStatus(401);
    const fooddataset = await FoodDataSet.findAll({
      attributes: [
        "id",
        "name",
        "sweet",
        "salty",
        "spicy",
        "bitter",
        "umami",
        "sour",
      ],
    });
    res.json(fooddataset);
  } catch (error) {
    console.log(error);
  }
};

export const getFoodDataSetById = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (user === null) return res.sendStatus(401);
    const ids = req.body;
    const fooddataset = await FoodDataSet.findAll({
      attributes: [
        "name",
        "sweet",
        "salty",
        "spicy",
        "bitter",
        "umami",
        "sour",
      ],
      where: {
        id: ids,
      },
    });
    res.json(fooddataset);
  } catch (error) {
    console.log(error);
  }
};
