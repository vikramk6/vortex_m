var ProductsModel = require('../model/productsmodel'),
    Imageupload = require('../utilities/imageUpload'), imageUpload,
    CartModel = require('../model/cartmodel'),  cm;

function ProductsController() {
    this.productmodel = new ProductsModel();
    cm = new CartModel();
}
ProductsController.prototype.getAll = function (req, res) {
    this.productmodel.get(req, function (err, data) {
        if(data && data.length) {
            cm.getId(req, function (cerr, cdata) {
              if(cdata) {
                  res.status(200).json({status:200, message:"success", header: "Products", "response":data, cart_count:cdata.length}); 
              } else {
                     res.status(400).json({status:400, header: "Products", "response":data, message:"Something went wrong"}); 
              }
            })
            
        } else {
             res.status(200).json({status:400, header: "Products", "response":data, message:"No Products found"});
        }
          
    });
};
ProductsController.prototype.getId = function (req, res) {
    this.productmodel.getId(req, function (err, data) {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
    });
};

ProductsController.prototype.create = function (req, res, next) {
    if (!req.body.product_name) {
        res.status(400).json({ status: '400', message: "Please provide product_name" });
    } else if (!req.body.product_image) {
        res.status(400).json({ status: '400', message: "Please provide product_image" });
    } else if (!req.body.description) {
        res.status(400).json({ status: '400', message: "Please provide description" });
    } else if (!req.body.product_price) {
        res.status(400).json({ status: '400', message: "Please provide product_price" });
    } else {
        let _self = this
        Imageupload.imageUpload(req.body.product_image, function (err, data) {
            if (err) {
                res.status(200).json({ status: '400', message: "Something went wrong" });
            } else if (data) {
                req.body.product_image = data;
                _self.productmodel.create(req, function (cdata) {
                    res.status(200).json(cdata);
                });
            }
        })
    }
};

ProductsController.prototype.update = function (req, res, next) {
    let _self = this;
    if (req.body.product_image) {
        Imageupload.imageUpload(req.body.product_image, function (err, data) {
            if (err) {
                res.status(400).json({ status: '400', message: "Something went wrong" });
            } else if (data) {
                req.body.product_image = data;
                _self.productmodel.update(req, function (udata) {
                    res.status(200).json(udata);
                });
            }
        });
    } else {
        this.productmodel.update(req, function (data) {
            res.status(200).json(data);
        });
    }
};

ProductsController.prototype.remove = function (req, res, next) {
    this.productmodel.remove(req, function (data) {
        res.status(200).json(data);
    });
};

module.exports = ProductsController