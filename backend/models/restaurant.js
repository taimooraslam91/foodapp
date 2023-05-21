import mongoose from "mongoose";
import reviewSchema from "./review.js";

const openingHoursSchema = new mongoose.Schema(
  {
    day: String,
    opening: String,
    closing: String,
  },
  { timestamps: true }
);

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    description: String,
    address: String,
    cuisine_type: [String],
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviews: [reviewSchema],
    openingHours: [openingHoursSchema],
    isOpen: Boolean,
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
