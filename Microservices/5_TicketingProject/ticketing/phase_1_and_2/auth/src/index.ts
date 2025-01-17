import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import "express-async-errors";
const app = express();

const userRouter = require("./routes/user/user_Route");
import { ErrorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

app.use(express.json());

// cookieSession Work if trust proxy set to "true"
app.set("trust proxy", true);
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);

app.use("/api/users", userRouter);

app.use("*", () => {
  throw new NotFoundError();
});

app.use(ErrorHandler);

const databaseName = "auth";
const defaultPort = 27017;
const clusterIPService = "auth-mongo-srv";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not defined");
  }
  try {
    await mongoose
      .connect(`mongodb://${clusterIPService}:${defaultPort}/${databaseName}`)
      .then(() => {
        console.log("Connected to Mongodb Container Pod Via ClusterIP");

        app.listen(3000, () => {
          console.log("Listening to http://localhost:3000");
        });
      });
  } catch (error) {
    console.error("Database connection Error \n" + error);
  }
};

start();
