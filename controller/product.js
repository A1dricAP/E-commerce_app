const formidable = require("formidable");
const _ = require("lodash");

const Product = require("../models/product");
const fs = require("fs"); //to get access to the file system.
const { errorHandler } = require("../helpers/dbErrorHandler");
// const product = require("../models/product");

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found, mate.",
      });
    }
    req.product = product; //this statement basically puts the found product with its correct corresponding id, into the req.product
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    //gotta parse the form, with the source being the request; using a callback function
    if (err) {
      return res.status(400).json({
        error: "Error, man! Image could not be uploaded!",
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required, my man!",
      });
    }

    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 100000) {
        //creating this, to keep the file size in check
        return res.status(400).json({
          error:
            "Error man! Image too BIGGG! Image should be less than 1mb in size.",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedproduct) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.json({
      deletedproduct,
      message: "product deleted successfully!",
    });
  });
};
