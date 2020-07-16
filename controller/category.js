const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");
// const Category = require("../models/category");
// const category = require("../models/category");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    console.log(req.category);
    //if the category with the id is found, then execute the following code.
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }

    req.category = category;
    next();
  });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  // console.log(res.json(req.category));
  return res.json(req.category);
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data); //last stopped here !!
  });
};

exports.remove = (req, res) => {
  const category = req.category;
  // category.name = req.body.name;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "category deleted successfully!",
    });
  });
};
exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
