const formidable = require("formidable");
const _ = require("lodash");

const Product = require("../models/product");
const fs = require("fs"); //to get access to the file system.
const { errorHandler } = require("../helpers/dbErrorHandler");

/******************************************************************************************************************************/

//this middleware is used to get the product by its ID number and store it in the req.

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

/******************************************************************************************************************************/

//this middleware is only used to read-actually display the information about the product.

exports.read = (req, res) => {
  req.product.photo = undefined; //to basically remove the photo information, otherwise req.product will be too big.
  return res.json(req.product);
};

/******************************************************************************************************************************/

//this middleware is used to create the product.

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
            "Error man! Image toooo BIGGG! Image should be less than 1mb in size.",
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

/******************************************************************************************************************************/

//this middleware is used to remove the product

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

/******************************************************************************************************************************/

//this middleware is used to update the product.

exports.update = (req, res) => {
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

    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
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

/******************************************************************************************************************************/

// By Sale/Arrival
// by sale = /products?sortBy=sold&order=desc&limit=4
// by arrival = /products?sortBy=createdAt&order=desc&limit=4
// if no params are sent, return all products.

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? req.query.limit : 6;

  //stopped here (6:07)
};
