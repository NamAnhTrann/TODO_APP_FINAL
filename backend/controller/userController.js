const User = require("../model/userSchema");

module.exports = {
  listAllUser: async function (req, res) {
    try {
      const users = await User.find({}).populate("task");
      if (!users) {
        console.log("User not available");
        return res.status(404).json({ message: "User not available" });
      } else {
        return res.status("All users retrieved", users);
      }
    } catch (err) {
      return res.status(404).json({ message: "Error", err });
    }
  },

  listUserId: async function (req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        console.log("User don't exist");
        return res.status(404).json({ message: "Error, user don't eixst" });
      } else {
        res.status(200).json(user); // ✅ Returns a single user object
      }
    } catch (err) {
      return res.status(404).json({ messaeg: "Error occured", err });
    }
  },

  getUserByFirebaseUid: async function (req, res) {
    try {
      const { uid } = req.params;
      const user = await User.findOne({ firebaseUid: uid });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ userId: user._id });
    } catch (err) {
      return res.status(500).json({ message: "Error retrieving user", err });
    }
  },

  saveFirebaseUid: async function (req, res) {
    const { uid, email } = req.body;
    if (!uid) {
      console.log("missing uid");
    }
    try {
      console.log("Received user data:", req.body);
      let user = await User.findOne({ firebaseUid: uid });
      if (!user) {
        user = new User({
          firebaseUid: uid,
          userEmail: email || "",
          userFirstName: "none",
          userLastName: "none",
          userPhoneNumber: 0,
        });
        await user.save();
        console.log(" New user saved:", user);
      }

      return res.status(201).json({ message: "User saved", userId: user._id });
    } catch (err) {
      return res.status(404).json({ message: "error saving user", err });
    }
  },

  updateUser: async function (req, res) {
    try {
      const userId = req.params.id;
      if (!userId) {
        console.log("no user exist", userId);
        return res.status(404).json({ message: "No user exist" });
      } else {
        let userLastName = req.body.userLastName;
        let userFirstName = req.body.userFirstName;
        let userPhoneNumber = req.body.userPhoneNumber;
        let userAddress = req.body.userAddress;

        const updateUser = await User.findOneAndUpdate(
          { _id: userId },
          {
            $set: { userFirstName, userLastName, userPhoneNumber, userAddress },
          }
        );

        if (!updateUser) {
          console.log("Cannot update");
          return res.status(404).json({ message: "Cannot update", updateUser });
        } else {
          return res.status(201).json(updateUser);
        }
      }
    } catch (err) {
      return res.status(404).json({ message: "Error", err });
    }
  },

  //helper api
  checkUserProfile: async function (req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      const isComplete =
        user.userFirstName !== "none" &&
        user.userLastName !== "none" &&
        user.userPhoneNumber !== "0" &&
        user.userAddress !== "none";

      return res.status(201).json({ isComplete });
    } catch (err) {
      return res.status(404).json({ message: "Error", err });
    }
  },
};
