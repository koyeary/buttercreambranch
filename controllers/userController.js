const UserModel = require("../models/User");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const result = await UserModel.createUser();
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating User", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Users" });
  }
};
exports.getUserByPin = async (req, res) => {
  try {
    const user = await UserModel.getUserByPin(req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch User" });
  }
};

exports.updateUser = async (req, res) => {
  const { userData } = req.body;
  try {
    const result = await UserModel.updateUser(userData);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating User", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.deleteUser(id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete User" });
  }
};
