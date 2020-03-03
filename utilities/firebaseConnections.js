var admin = require("firebase-admin"),
    config = require('../../config/config.json'),
    app = admin.initializeApp({
        credential: admin.credential.cert(config.firebase_connections.serviceAcountKey),
        databaseURL: config.firebase_connections.databaseURL
    }, "web");
module.exports.web = app.database();