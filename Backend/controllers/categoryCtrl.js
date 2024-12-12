const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const Transaction = require("../models/Transaction");

//! user Controller

const categoryCtrl = {
  //* Add category
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;

    //? Check if name and type of category already exists
    if (!name || !type) {
      throw new Error("Please add name and type of category");
    }

    //? change category  name to lower case
    const normalizedName = name.toLowerCase();

    //? valid type of category
    // const validTypes = ["Income", "Expense"];
    // if (!validTypes.includes(type.toLowerCase())) {
    //   throw new Error("Invalid category type");
    // }

    //? check if category already exists
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });
    if (categoryExists) {
      throw new Error("Category already exists");
    }

    //? create new category
    const category = await Category.create({
      name: normalizedName,
      user: req.user,
      type,
    });
    res.status(201).json(category);
  }),

  //*  Lists category
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),
  
  //!update
  update: asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { type, name } = req.body;
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(categoryId);
    if (!category && category.user.toString() !== req.user.toString()) {
      throw new Error("Category not found or user not authorized");
    }
    const oldName = category.name;
    //! Update category properties
    category.name = normalizedName || category.name;
    category.type = type || category.type;
    const updatedCategory = await category.save();
    //Update affected transaction
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        { $set: { category: updatedCategory.name } }
      );
    }
    res.json(updatedCategory);
  }),
  //* delete category
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category && category.user.toString() === req.user.toString()) {
      // assign the new category by default
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        {
          user: req.user,
          category: category.name,
        },
        {
          $set: {
            category: defaultCategory,
          },
        }
      );
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Category removed and transaction updated" });
    } else {
      throw new Error("Unauthorized to delete this category");
    }
  }),
};

module.exports = categoryCtrl;
