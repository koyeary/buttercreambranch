const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// GET
router.get("/users", userController.getAllUsers);

// POST
router.post("/users", userController.createUser);
router.post("/users/pin", userController.getUserByPin);

// PUT
router.put("/users/pin", userController.updateUser);

//DELETE
router.delete("/users/pin", userController.deleteUser);

module.exports = router;
