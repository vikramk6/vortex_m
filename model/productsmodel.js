var productsSchema = require('./schemas/productsSchema');
var cartSchema = require('./schemas/cartDetailsSchema');


function ProductsModel() {
     
}

ProductsModel.prototype.get = function (req, callback) {
    productsSchema.find({}, callback);
};
ProductsModel.prototype.getId = function (req, callback) {
    let product_id = req.params.id || req.product_id
    productsSchema.find({ _id: product_id }, callback);
};

ProductsModel.prototype.create = function (req, callback) {
    productsSchema.create(req.body, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    });
};

ProductsModel.prototype.update = function (req, callback) {
    productsSchema.update({ _id: req.params.id }, req.body, { multi: true }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    })
};

ProductsModel.prototype.remove = function (req, callback) {
    productsSchema.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    });
};

module.exports = ProductsModel;