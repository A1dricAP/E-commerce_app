const formidable = require("formidable");
const _ = require("lodash");

const Product = require("../models/product");
const fs = require("fs"); //to get access to the file system.
const { errorHandler } = require("../helpers/dbErrorHandler");
const product = require("../models/product");

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
  //creating the rest of the url here.
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6; //parseInt method needs to be used when inputting number.

  //pulling the products from the database.
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      res.json(products);
    });
};

/******************************************************************************************************************************/
//it will find the peoducts based on the req product category
// other products that has the same category will be returned.

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6; //parseInt method needs to be used when inputting number.

  //this line finds the products, not including the inputted product id; since this middleware is to show related products.
  // [$ne:] means excluding

  //we're trying to find the products based on the category.
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

/******************************************************************************************************************************/

// this middleware is used to list all the categories.
// and only the number of categories used, will show up.

exports.listCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found, my man!",
      });
    }
    res.json(categories);
  });
};

/******************************************************************************************************************************/

/* This Middleware will take care of:
 * list product by search
 * implementing product search in react frontend
 * show categories in checkbox and price range in radio buttons.
 * as the user clicks on those checkboxes and radio buttons, an api request will be made and show the desired products.
 */

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {}; //initially, the object is gonna be empty, but it will be populated by the for loop method.

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          // $gte: greater than
          // $lte: lesser than
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

/******************************************************************************************************************************/

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    //setting the content type to send the photo, depending on the image saved type. [eg:image.png]
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
