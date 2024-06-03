import express from "express";
import userRouter from "./users/userRoutes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "everything is fine" });
});

app.use("/api/user", userRouter);

export default app;
