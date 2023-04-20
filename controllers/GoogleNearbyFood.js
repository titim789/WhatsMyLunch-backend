import axios from "axios";
import Users from "../models/UserModel.js";

export const getGoogleNearbyFood = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    const payload = req.body;
    console.log(payload);
    const nearbyfood = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${payload.location.latitude}%2C${payload.location.longitude}&radius=${payload.radius}&type=restaurant&keyword=${payload.keyword}&key=AIzaSyDlnLx4tkEuPBsQfVS8WtiBD7hpVqocqxI`
    );

    const response = nearbyfood.data.results.map((result) => {
      return {
        lng: result.geometry.location.lng,
        lat: result.geometry.location.lat,
        name: result.name,
        rating: result.rating,
        address: result.vicinity,
      };
    });

    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
};
