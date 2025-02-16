const express = require("express");
const taskController = require("../controller/taskController");
const router = express.Router();

router.post("/add/task/api/:id", taskController.addTaskApi);
router.put("/update/task/api/:id", taskController.updateTaskApi);
router.delete("/delete/task/api/:id", taskController.removeTaskApi);
router.get("/get/all/task/api", taskController.getAllTask);
router.get("/get/task/api/:id", taskController.getTaskId);

router.get("/get/user/task/api/:id", taskController.getTaskForUser);
router.put("/update/task/status/api/:id", taskController.updateTaskStatusApi);
module.exports = router;
