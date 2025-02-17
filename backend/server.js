const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cron = require("node-cron");

const Dailies = require("./model/dailyTaskSchema");
const User = require("./model/userSchema");

const taskRouter = require("./router/taskRouter");
const userRouter = require("./router/userRouter");
const dailyRouter = require("./router/dailyTaskRouter");

let app = express();
app.use(express.json());

const port_no = process.env.PORT_NO || 9090;
const db_url = process.env.MONGO_DB;

//allow connection
const allowedConnection = [
  "http://localhost:4200",
  "https://TaskHub.onrender.com",
  "https://taskhub-6hajkuls0-namanhtranns-projects.vercel.app",
  "https://taskhub-cyan.vercel.app",
];

//using cors
app.use(
  cors({
    origin: allowedConnection,
    methods: "GET,POST,PUT,DELETE",
    credential: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(taskRouter);
app.use(userRouter);
app.use(dailyRouter);

app.listen(port_no, function (err) {
  if (!err) {
    console.log(`App is connected to port ${port_no}`);
  } else {
    console.log("Error occured", err);
  }
});
app.get("/", (req, res) => {
  res.send("✅ Backend is Running!");
});

async function connectDB() {
  try {
    await mongoose.connect(db_url);
    console.log(`Conneted to the database ${db_url}`);
  } catch (err) {
    console.error("connection error");
  }
}
connectDB();

cron.schedule("*s/30 * * * *", async function () {
  console.log("Running every hour...");
  try {
    const taskToRemove = await Dailies.find({
      dailyTaskCreatedAt: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    if (!taskToRemove.length) {
      console.log("No expired tasks to remove.");
      return;
    }

    const dailyIds = taskToRemove.map((task) => task._id.toString());
    const userIds = taskToRemove.map((task) => task.userId.toString());

    console.log("dailyIds:", dailyIds);
    console.log("userIds:", userIds);

    await Dailies.deleteMany({ _id: { $in: dailyIds } });
    console.log("Deleted expired daily tasks");
    const updateResult = await User.updateMany(
      { _id: { $in: userIds } },
      { $pull: { daily: { $in: dailyIds } } }
    );
    console.log("updateMany result is:", updateResult);
  } catch (err) {
    console.log("Error for cron ffs:", err);
  }
});
