const express = require("express");
const isAuthenticated = require("../middleware/isAuth");
const transactionCtrl = require("../controllers/transactionCtrl");
const transactionRouter = express.Router();

// routes
//! Add
transactionRouter.post(
  "/api/v1/transaction/create",
  isAuthenticated,
  transactionCtrl.create
);
//! Lists
transactionRouter.get(
  "/api/v1/transaction/list",
  isAuthenticated,
  transactionCtrl.transactionFilter
);

// //! transactionFilter
// transactionRouter.get(
//   "/api/v1/transaction/filter",
//   isAuthenticated,
//   transactionCtrl.transactionFilter
// );


//! update
transactionRouter.put(
  "/api/v1/transaction/update/:id",
  isAuthenticated,
  transactionCtrl.update
);


//! delete
transactionRouter.delete(
  "/api/v1/transaction/delete/:id",
  isAuthenticated,
  transactionCtrl.delete
);


module.exports = transactionRouter;
