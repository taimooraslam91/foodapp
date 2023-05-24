import express from "express";
const router = express.Router();
import { restaurants, foodItems } from "../data/data.js";

router.get("/", (req, res) => {
  res.json(restaurants);
});

router.get("/:id", (req, res) => {
  const restaurant = restaurants.find((x) => x.id === Number(req.params.id));
  if (restaurant) {
    const menu = foodItems
      .filter((item) => item.restaurantId === Number(req.params.id))
      .map((item) => {
        return { ...item, restaurant: restaurant.name };
      });
    res.json({ ...restaurant, menuItems: menu });
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

export default router;
