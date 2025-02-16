const Dalies = require("../model/dailyTaskSchema.js");
const User = require("../model/userSchema");

module.exports = {
  addDaliesTask: async function (req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      const NewDaily = new Dalies({
        ...req.body,
        userId: user._id,
      });
      await NewDaily.save();

      user.daily.push(NewDaily._id);
      await user.save();
      console.log("Daily saved");

      const populateDaily = await NewDaily.populate("userId");

      return res.status(201).json(populateDaily);
    } catch (err) {
      return res.status(404).json({ message: "error" }, err);
    }
  },

  displayDailyTask: async function (req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findOne({ _id: userId }).populate("daily");
      return res.status(201).json(user.daily);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Error displaying task for user" }, err);
    }
  },

  removeDaily: async function (req, res) {
    try {
      const dailyId = req.params.id;
      if (!dailyId) {
        console.log("No Id");
      }
      const dailies = await Dalies.findByIdAndDelete(dailyId);
      console.log(`${dailies} has been removed`);

      const userUpdateResult = await User.updateMany(
        { daily: dailyId },
        { $pull: { daily: dailyId } }
      );

      return res.status(201).json(userUpdateResult);
    } catch (err) {
      return res.status(401).json({ message: "error" }, err);
    }
  },
};
