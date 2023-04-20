import UserTopFoodChoice from "../models/UserTopFoodChoiceModel.js";
import Users from "../models/UserModel.js";
import { Op, fn, col, where } from "sequelize";
import FoodDataSet from "../models/FoodDataSetModel.js";
import TastePalette from "../models/TastePaletteModel.js";
import UserFoodRanking from "../models/UserFoodRankingModel.js";

export const getUserTopFoodChoice = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    const fooddataset = await FoodDataSet.findAll({
      raw: true,
      attributes: ["id", "name"],
    });

    var formatted_fooddataset = {};

    fooddataset.forEach((food) => {
      formatted_fooddataset[food.id] = food.name;
    });

    const usertopfoodchoice = await UserTopFoodChoice.findAll({
      raw: true,
      attributes: [
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
        "rank21",
        "rank22",
        "rank23",
        "rank24",
        "rank25",
        "rank26",
        "rank27",
        "rank28",
        "rank29",
        "rank30",
      ],
      where: {
        userId: user[0].id,
      },
    });
    console.log(usertopfoodchoice);
    const resultString = JSON.stringify(usertopfoodchoice, null, 2);
    if (resultString === "[]") {
      return res.status(200).json({ usertopfoodchoice: [] });
    }
    var concat_usertopfoodchoice = [];
    Object.keys(usertopfoodchoice[0]).forEach((rank) => {
      const foodChoice = usertopfoodchoice[0][rank];
      concat_usertopfoodchoice.push({
        id: foodChoice,
        name: formatted_fooddataset[foodChoice],
      });
    });

    return res
      .status(200)
      .json({ usertopfoodchoice: concat_usertopfoodchoice });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
};

export const setUserTopFoodChoice = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    const payload = {
      rank1: req.body[0],
      rank2: req.body[1],
      rank3: req.body[2],
      rank4: req.body[3],
      rank5: req.body[4],
      rank6: req.body[5],
      rank7: req.body[6],
      rank8: req.body[7],
      rank9: req.body[8],
      rank10: req.body[9],
      rank11: req.body[10],
      rank12: req.body[11],
      rank13: req.body[12],
      rank14: req.body[13],
      rank15: req.body[14],
      rank16: req.body[15],
      rank17: req.body[16],
      rank18: req.body[17],
      rank19: req.body[18],
      rank20: req.body[19],
      rank21: req.body[20],
      rank22: req.body[21],
      rank23: req.body[22],
      rank24: req.body[23],
      rank25: req.body[24],
      rank26: req.body[25],
      rank27: req.body[26],
      rank28: req.body[27],
      rank29: req.body[28],
      rank30: req.body[29],
      userId: user[0].id,
    };

    const usertopfoodchoice = await UserTopFoodChoice.findAll({
      where: {
        userId: user[0].id,
      },
    });
    const resultString = JSON.stringify(usertopfoodchoice, null, 2);
    if (resultString !== "[]") {
      await UserTopFoodChoice.update(payload, {
        where: {
          userId: user[0].id,
        },
      });
    } else {
      await UserTopFoodChoice.create(payload);
    }
    const tastePalette = await setUserTastePalette(payload);
    await setUserFoodRanking(tastePalette);

    return res.status(200).json("Success");
  } catch (error) {
    console.log(error);
  }
};

async function setUserTastePalette(topChoices) {
  const listOfValues = Object.values(topChoices);
  const fooddataset = await FoodDataSet.findAll({
    attributes: [
      [fn("sum", col("sweet")), "sweet_score"],
      [fn("sum", col("salty")), "salty_score"],
      [fn("sum", col("spicy")), "spicy_score"],
      [fn("sum", col("bitter")), "bitter_score"],
      [fn("sum", col("umami")), "umami_score"],
      [fn("sum", col("sour")), "sour_score"],
    ],
    where: {
      id: {
        [Op.in]: listOfValues,
      },
    },
  });
  const total_score = Object.values(fooddataset[0].dataValues).reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const user_palate = {
    sweet:
      Math.round((fooddataset[0].dataValues.sweet_score * 100) / total_score) /
      100,
    salty:
      Math.round((fooddataset[0].dataValues.salty_score * 100) / total_score) /
      100,
    spicy:
      Math.round((fooddataset[0].dataValues.spicy_score * 100) / total_score) /
      100,
    bitter:
      Math.round((fooddataset[0].dataValues.bitter_score * 100) / total_score) /
      100,
    umami:
      Math.round((fooddataset[0].dataValues.umami_score * 100) / total_score) /
      100,
    sour:
      Math.round((fooddataset[0].dataValues.sour_score * 100) / total_score) /
      100,
    userId: topChoices.userId,
  };

  const tastepalette = await TastePalette.findAll({
    where: {
      userId: topChoices.userId,
    },
  });
  const resultString = JSON.stringify(tastepalette, null, 2);
  if (resultString !== "[]") {
    TastePalette.update(user_palate, { where: { userId: topChoices.userId } });
  } else {
    TastePalette.create(user_palate);
  }

  return user_palate;
}

async function setUserFoodRanking(userTastePalette) {
  const userSweet = userTastePalette.sweet;
  const userSalty = userTastePalette.salty;
  const userSpicy = userTastePalette.spicy;
  const userBitter = userTastePalette.bitter;
  const userUmami = userTastePalette.umami;
  const userSour = userTastePalette.sour;

  const vectorLengthOfUserPalette = Math.sqrt(
    Math.pow(userSweet, 2) +
      Math.pow(userSalty, 2) +
      Math.pow(userSpicy, 2) +
      Math.pow(userBitter, 2) +
      Math.pow(userUmami, 2) +
      Math.pow(userSour, 2)
  );

  const fooddataset = await FoodDataSet.findAll({
    attributes: ["id", "sweet", "salty", "spicy", "bitter", "umami", "sour"],
  });

  var scores = {};

  for (var i = 0; i < fooddataset.length; i++) {
    const vectorLengthOfFoodItem = Math.sqrt(
      Math.pow(fooddataset[i].dataValues.sweet, 2) +
        Math.pow(fooddataset[i].dataValues.salty, 2) +
        Math.pow(fooddataset[i].dataValues.spicy, 2) +
        Math.pow(fooddataset[i].dataValues.bitter, 2) +
        Math.pow(fooddataset[i].dataValues.umami, 2) +
        Math.pow(fooddataset[i].dataValues.sour, 2)
    );
    const dotProduct =
      userSweet * fooddataset[i].dataValues.sweet +
      userSalty * fooddataset[i].dataValues.salty +
      userSpicy * fooddataset[i].dataValues.spicy +
      userBitter * fooddataset[i].dataValues.bitter +
      userUmami * fooddataset[i].dataValues.umami +
      userSour * fooddataset[i].dataValues.sour;
    scores[fooddataset[i].dataValues.id] =
      dotProduct / (vectorLengthOfUserPalette * vectorLengthOfFoodItem);
  }

  // Sorting the cosine similarity scores
  const sorted_scores = Object.entries(scores).sort(function (first, second) {
    return second[1] - first[1];
  });

  const payload = {};

  sorted_scores.slice(0, 50).forEach((score, i) => {
    payload[`rank${i + 1}`] = `${score[0]}`;
  });

  payload["userId"] = userTastePalette.userId;

  const userfoodranking = await UserFoodRanking.findAll({
    where: { userId: userTastePalette.userId },
  });

  const resultString = JSON.stringify(userfoodranking, null, 2);
  if (resultString !== "[]") {
    await UserFoodRanking.update(payload, {
      where: {
        userId: userTastePalette.userId,
      },
    });
  } else {
    await UserFoodRanking.create(payload);
  }
}
