import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import restaurantRouter from "./routes/restaurantRouter.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Use cors middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("APP Running");
});
app.use("/api/restaurants", restaurantRouter);

app.listen(PORT, () => {
  console.log(`Foodies app backend listening on port ${PORT}`);
});
