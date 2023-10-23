import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations/auth.js";
import { postCreateValidation } from "./validations/post.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://admin:qweqwe@cluster0.lpjz9v9.mongodb.net/blog?retryWrites=true&w=majority"
    // "mongodb://admin:qweqwe@ac-umsijro-shard-00-00.lpjz9v9.mongodb.net:27017,ac-umsijro-shard-00-01.lpjz9v9.mongodb.net:27017,ac-umsijro-shard-00-02.lpjz9v9.mongodb.net:27017/?ssl=true&replicaSet=atlas-10rbb6-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connect");
  })
  .catch((err) => console.warn("ERROR DB CONNECT", err));

const app = express();

app.use(express.json());
app.post("/auth/login", loginValidation, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);
app.post("/auth/register", registerValidation, UserController.register);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
// app.delete("/posts", PostController.remove);
// app.patch("/posts", PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.warn(err);
  }

  console.log("run server");
});