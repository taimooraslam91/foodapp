import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import restaurantRouter from "./routes/restaurantRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Use cors middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("APP Running");
});
app.use("/api/restaurants", restaurantRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Foodies app backend listening on port ${PORT}`);
});
