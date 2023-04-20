import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  forgetPassword,
  forgetPasswordAuthentication,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { WML } from "../controllers/WML.js";
import { SurpriseMe } from "../controllers/SurpriseMe.js";
import {
  getUserTopFoodChoice,
  setUserTopFoodChoice,
} from "../controllers/UsersChoice.js";
import {
  getFoodDataSet,
  getFoodDataSetById,
} from "../controllers/FoodDataSet.js";
import { getUsersTastePalette } from "../controllers/UsersTastePalette.js";

const router = express.Router();

//login
router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.post("/forgetpassword", forgetPassword);
router.post("/forgetpasswordauth", forgetPasswordAuthentication);

//whats my lunch
router.get("/wml", WML);

//surprise me
router.get("/surprise", SurpriseMe);

//user top food choice
router.get("/userstopfoodchoice", getUserTopFoodChoice);
router.post("/userstopfoodchoice", setUserTopFoodChoice);

//Food dataset
router.get("/fooddataset", getFoodDataSet);
router.post("/fooddataset", getFoodDataSetById);

//user taste palette
router.get("/userstastepalette", getUsersTastePalette);

export default router;
