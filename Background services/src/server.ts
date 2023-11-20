import express, {
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import cron from "node-cron";

import dotenv from "dotenv";
import cors from "cors";
import { Registration_run } from "./controllers/registration";
import { welcomeUser } from "./controllers/WelcomeUser";
dotenv.config();

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

const run = async (): Promise<void> => {
  // cron.schedule("2 * * * * *", async () => {
  //   await Registration_run();
  // });
  cron.schedule("*/10 * * * * *", async () => {
    console.log("Checking for a new user");

    await welcomeUser();
  });

  //   cron.schedule("2 * * * * *", async () => {
  //     await projectAssign.run();
  //   });
  // cron.schedule("2 * * * * *", async () => {
  //   await taskAssign.run();
  // });
};

run();
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send({ status: "Ok", message: "Api!" });
});

app.get("*", (req, res) => {
  res.status(404).send({ message: "Page not found" });
});

const PORT = process.env.SERVER_PORT || 5021;
app.listen(PORT, () => {
  console.log(`Mail server up and running on port ${PORT}`);
});
