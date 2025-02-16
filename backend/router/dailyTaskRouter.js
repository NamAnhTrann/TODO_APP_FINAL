const express = require("express");
const router = express.Router();
const dailyController = require("../controller/dailyTaskController.js");

router.post("/add/daily/api/:id", dailyController.addDaliesTask);
router.get("/get/daily/api/:id", dailyController.displayDailyTask);
router.delete("/delete/daily/api/:id", dailyController.removeDaily);
module.exports = router;
