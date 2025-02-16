const Task = require("../model/taskSchema.js");
const User = require("../model/userSchema");
const mongoose = require("mongoose");

module.exports = {
  addTaskApi: async function (req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      const newTask = new Task({
        ...req.body,
        userId: user._id,
      });
      await newTask.save();
      console.log("Add Task sucessfully");

      user.task.push(newTask._id);
      await user.save();

      const populatedTask = await newTask.populate("userId");

      return res
        .status(201)
        .json({ message: "Saved Task", newTask: populatedTask });
    } catch (err) {
      return res.status(404).json({ message: "Error", err });
    }
  },

  getAllTask: async function (req, res) {
    try {
      const tasks = await Task.find({}).populate("userId");
      if (!tasks) {
        console.log("Task not available");
        return res.status(404).json({ message: "No task available" });
      } else {
        return res.status(201).json(tasks);
      }
    } catch (err) {
      return res.status(404).json({ message: "Error", err });
    }
  },

  getTaskForUser: async function (req, res) {
    try {
      const userId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const user = await User.findOne({ _id: userId }).populate("task");

      return res.status(201).json(user.task);
    } catch (err) {
      return res.status(401).json({ message: "Error" });
    }
  },

  getTaskId: async function (req, res) {
    try {
      const taskId = req.params.id;
      const getTaskId = await Task.findById(taskId);
      if (!getTaskId) {
        console.log("Task cannot be retrieved", getTaskId);
      } else {
        console.log(`Task retrieved: ${getTaskId}`);
        return res.status(201).json({ message: "Task retrieved", getTaskId });
      }
    } catch (err) {
      return res.status(401).json({ message: "Error getting task", err });
    }
  },

  removeTaskApi: async function (req, res) {
    try {
      const taskId = req.params.id;
      if (!taskId) {
        console.log("Task does not exist", taskId);
        return res.status(404).json({ message: "Task does not exist", taskId });
      } else {
        const tasks = await Task.findByIdAndDelete(taskId);
        console.log(`Task ${tasks} has been deleted`);

        //update user
        const userUpdateResult = await User.updateMany(
          { task: taskId },
          { $pull: { task: taskId } }
        );

        return res
          .status(201)
          .json({ message: "Task has been deleted", tasks, userUpdateResult });
      }
    } catch (err) {
      return res.status(401).json({ message: "Error occured", err });
    }
  },

  updateTaskApi: async function (req, res) {
    try {
      const taskId = req.params.id;
      if (!taskId) {
        console.log("No Task to update");
        return res.status(404).json({ message: "No Task to update" });
      } else {
        let taskName = req.body.taskName;
        let taskPriority = req.body.taskPriority;
        let taskCompletion = req.body.taskCompletion;
        let taskDescription = req.body.taskDescription;

        const updateTask = await Task.findOneAndUpdate(
          { _id: taskId },
          { $set: { taskName, taskPriority, taskCompletion, taskDescription } },
          { new: true }
        );

        if (!updateTask) {
          console.log("cannot update");
          return res.status(404).json({ message: "Cannot update" });
        } else {
          return res.status(201).json({ message: "Task updated", updateTask });
        }
      }
    } catch (err) {
      return res.status(404).json({ message: "Error", err });
    }
  },

  updateTaskStatusApi: async function (req, res) {
    try {
      const { id } = req.params;
      const { newStatus } = req.body;
      const updateTask = await Task.findByIdAndUpdate(
        id,
        { taskCompletion: newStatus },
        { new: true }
      );
      return res.status(201).json(updateTask);
    } catch (err) {
      return res.status(401).json({ message: "Error" });
    }
  },
};
