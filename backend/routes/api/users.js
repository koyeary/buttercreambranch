const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// GET
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);

// POST
router.post("/users", userController.createUser);

// PUT
router.put("/users/:id", userController.updateUser);

//DELETE
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
