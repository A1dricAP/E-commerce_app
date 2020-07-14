const formidable = require("formidable");
const _ = require("lodash");

const Product = require("../models/product");
// const { parse } = require("dotenv/types");
const fs = require("fs"); //to get access to the file system.
const { errorHandler } = require("../helpers/dbErrorHandler");
// const { propfind } = require("../routes/auth");

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
    let product = new Product(fields);

    if (files.photo) {
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
