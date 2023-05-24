import express from "express";
import jwt from "jsonwebtoken";
import { usersData } from "../data/data.js";

const userRouter = express.Router();

userRouter.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = usersData.find(
    (user) => user.username === username || user.email === username
  );
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Assuming the user is valid, generate and issue a JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.SECRET_KEY
  );

  res.json({ token, user });
});

export default userRouter;
