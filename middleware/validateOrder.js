// middlewares/validateOrder.js
const { body } = require("express-validator");

const validStatuses = ["pending", "ready", "complete"];
const validSizes = ['7"', '8"', '10"', "QS", "HS", "FS"];

exports.validateOrder = [
  body("status")
    .optional()
    .isIn(validStatuses)
    .withMessage(`Status must be one of: ${validStatuses.join(", ")}`),

  body("customer_name")
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ max: 100 })
    .withMessage("Customer name cannot exceed 100 characters"),

  body("type")
    .notEmpty()
    .withMessage("Cake type is required")
    .isLength({ max: 100 })
    .withMessage("Cake type cannot exceed 100 characters"),

  body("size")
    .notEmpty()
    .isIn(validSizes)
    .withMessage(`Size must be one of: ${validSizes.join(", ")}`),

  body("quantity")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  body("contact")
    .notEmpty()
    .withMessage("Contact is required")
    .isLength({ max: 50 })
    .withMessage("Contact cannot exceed 50 characters"),
];
