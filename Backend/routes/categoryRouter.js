const express = require("express");
const isAuthenticated = require("../middleware/isAuth");
const categoryRouter = express.Router();
const categoryCtrl = require("../controllers/categoryCtrl");

// routes
//! Add
categoryRouter.post(
  "/api/v1/categories/create",
  isAuthenticated,
  categoryCtrl.create
);
//! Lists
categoryRouter.get(
  "/api/v1/categories/list",
  isAuthenticated,
  categoryCtrl.lists
);

// !Update
categoryRouter.put(
  "/api/v1/categories/update/:id",
  isAuthenticated,
  categoryCtrl.update
);

// !Delete
categoryRouter.delete(
  "/api/v1/categories/delete/:id",
  isAuthenticated,
  categoryCtrl.delete
);
module.exports = categoryRouter;
