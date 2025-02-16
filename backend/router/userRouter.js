const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.get("/get/all/user", userController.listAllUser);
router.get("/get/user/:id", userController.listUserId);
router.get("/get-user/:uid", userController.getUserByFirebaseUid);

router.post("/api/save-user", userController.saveFirebaseUid);
router.put("/api/update/user/:id", userController.updateUser);
router.get("/api/checkUserProfile/:id", userController.checkUserProfile);

module.exports = router;
