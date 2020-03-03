var CartModel = require('../model/cartmodel'),
    Imageupload = require('../utilities/imageUpload'), imageUpload;

function CartController() {
    this.model = new CartModel();
}

CartController.prototype.getByUserId = function (req, res) {
    this.model.getId(req, function (err, data) {
         if (data && data.length) {
             res.status(200).json({ status: 200, message: "Success", response:data, cart_count: data.length});
        } else {
            res.status(200).json({ status: 204, message: "No products added to cart", cart_count: 0 });
        }
    });
};

CartController.prototype.create = function (req, res, next) {
    if (!req.body.product_id) {
        res.status(201).json({ status: '201', message: "Please provide product_id" });
    } else if (!req.body.user_id) {
        res.status(201).json({ status: '201', message: "Please provide user_id" });
    } else {
        let _self = this, obj = {} ;
        _self.model.create(req, function (cdata) {
             _self.model.getId(req, function (counterr, countdata) {
                 obj = cdata;
              if(countdata) {
                   
                   obj.cart_count = countdata.length;
                   res.status(201).json(obj);
               //   res.status(200).json({status:200, message:"Successfully Added To Cart", "response":cdata, cart_count:countdata.length}); 
              } else {
                     res.status(400).json({status:400, "response":data, message:"Something went wrong"}); 
              }
            })
           
        });
    }
};

CartController.prototype.update = function (req, res, next) {
    let _self = this;
    if (!req.body.quantity) {
        res.status(201).json({ status: '400', message: "Please provide quantity" });
    } else {
        this.model.update(req, function (data) {
            res.status(200).json(data);
        });
    }
};

CartController.prototype.remove = function (req, res, next) {
    this.model.remove(req, function (data) {
        res.status(200).json(data);
    });
};

module.exports = CartController