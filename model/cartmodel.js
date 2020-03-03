var cartSchema = require('./schemas/cartDetailsSchema');
var productsSchema = require('./schemas/productsSchema');


function cartDetailsModel() {
    this.cart = cartSchema;
    this.products = productsSchema;
}

cartDetailsModel.prototype.get = function (req, callback) {
    this.cart.find({}, callback);
};

cartDetailsModel.prototype.getId = function (req, callback) {
    let _self = this, productsData = [], userId;
    if (req.params.user_id) {
        userId = req.params.user_id;
    } else if (req.body.user_id) {
        userId = req.body.user_id
    }
    _self.cart.find({ user_id: userId }, function (err, data) {
        callback(err, data);
    });
}



cartDetailsModel.prototype.create = function (req, callback) {
    let _self = this;
    _self.cart.find({
        $and: [
            { "user_id": req.body.user_id },
            { "product_id": req.body.product_id }
        ]
    }, function (err, data) {
      
        if (data && data.length) {
            callback({ status: '201', message: "Already product added to cart", response: data });
        } else {
            productsSchema.find({ _id: req.body.product_id }, function (err, data) {
                req.body.product_name = data[0].product_name;
                req.body.product_image = data[0].product_image;
                req.body.description = data[0].description;
                req.body.product_price = data[0].product_price;
                _self.cart.create(req.body, function (err, data) {
                    if (err) {
                        callback({ status: '400', message: "Something went wrong" })
                    } else {
                        callback({ status: '200', message: "Successfully added to cart", response: data })
                    }
                });
            });
        }
       
    });

};

cartDetailsModel.prototype.update = function (req, callback) {
    this.cart.updateOne({ _id: req.params.id }, req.body, { multi: false }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully updated quantity", response: data })
        }
    })
};

cartDetailsModel.prototype.remove = function (req, callback) {
    this.cart.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully deleted form cart", response: data })
        }
    });
};

module.exports = cartDetailsModel;