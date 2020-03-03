var uniqid = require('uniqid'),
    config = require('../config/config.json')

module.exports.videoUpload = function (req, next) {

    var images = [];
    if (typeof req === 'string') {
        let image = "";
        let imagePath = "";
        let d = new Date();
        let time = d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds()
        image = time + uniqid() + ".mp4";
        imagePath = "./images/" + image;
        require("fs").writeFile(imagePath, req, 'base64', (err, data) => {
            if (err) {
                console.log(err, imagePath);
            } else {
                console.log(imagePath);
                next(err, config.image_path + image);

            }
        });
    } else {
        req.forEach(function (v, i, array) {
            for (var url in v) {
                let image = "";
                let imagePath = "";
                var imagesarray = [];
                var update_data = {};
                let d = new Date();
                let time = d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds()
                image = time + uniqid() + ".mp4";
                imagePath = "./images/" + image;
                require("fs").writeFile(imagePath, v[url], 'base64', (err, data) => {
                    if (err) {
                        console.log(err, images);
                    } else {
                        images.push({ [url]: imagePath });
                        if (images.length === array.length) {
                            next(err, images);
                        }
                    }
                });
            }
        });
    }

};