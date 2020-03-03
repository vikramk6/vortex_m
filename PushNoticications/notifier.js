var webpush = require('web-push'),
    FCM = require('fcm-push'),
    zmq = require('zmq'),
    socket = zmq.socket('sub'),
    firebaseDB = require('./../utils/database/firebase-connections.js').web,
    pushSubscriptions,
    fcm,
    config = require('../config/default.json'),
    onSiteNotifications,
    messages;
pushSubscriptions = firebaseDB.ref().child('/subscriptions');
onSiteNotifications = firebaseDB.ref().child('/onSiteNotifications');
messages = firebaseDB.ref().child('/messages');
webpush.setGCMAPIKey(config.firebase_connections.gcmKey);
fcm = new FCM(config.firebase_connections.serverKey);

socket.on("message", function (topic, message) {
    var pushData = JSON.parse(message.toString());
    if (pushData.to && Array.isArray(pushData.to)) {
        console.log("data is in Array format", pushData);
        pushData.to.forEach(function (email, key) {
            sendNotification(email, pushData);
        });
    } else if (pushData.to && typeof pushData.to === 'string') {
        console.log("data is in string format");
        sendNotification(pushData.to, pushData);
    }
});
function sendNotification(email, pushData) {
    sendWebNotification(email, pushData, function (err) {
        if (err) {
            console.log("err sending WebNotification for ::", email, err);
        } else {
            console.log("WebNotification sent for :: ", email);
        }
    });
    sendPushNotification(email, pushData);
}
function sendWebNotification(email, pushData, callback) {
    console.log("pushData", pushData);
    var content = new Date().toUTCString(),
        notification = {
            time: content,
            email: email,
            message: pushData.message,
            icon: pushData.icon,
            sound: pushData.sound,
            redirect_url: pushData.redirect_url,
            image_url: pushData.image_url,
            isClicked: false
        };
    if (pushData.isMessage)
        messages.child((new Date()).valueOf()).set(notification, callback);
    else
        onSiteNotifications.child((new Date()).valueOf()).set(notification, callback);
}

function sendPushNotification(email, pushData) {
    pushSubscriptions.orderByChild('email').equalTo(email).once("value", function (data) {
        if (data.val()) {
            var notificationData = JSON.parse(JSON.stringify(data.val()));
            Object.keys(notificationData).forEach(function (keys) {
                console.log("notificationData[key]");
                push(notificationData[keys], pushData, function (err, resData) {
                    if (err) {
                        console.log(" pushNotification failed for ::", notificationData[keys].email, err);
                    } else {
                        if (pushData.debug) {
                            console.log("debug @pushNotification", pushData.debug);
                        }
                        console.log(" pushNotification sent successfully to ::", notificationData[keys].email);
                    }
                });
            });
        } else {
            console.log("no data found for email::", email);
        }
    });
}
function push(data, pushData, callback) {
    var pushSubscription = {
        "endpoint": data.endpoint,
        "keys": {
            "p256dh": data.key,
            "auth": data.auth
        }
    };
    var params = {
        title: 'Hi ' + data.name,
        message: pushData.message,
        icon: pushData.icon,
        sound: pushData.sound,
        redirect_url: pushData.redirect_url,
        image_url: pushData.image_url
    };
    webpush.sendNotification(pushSubscription, JSON.stringify(params), {
        vapidDetails: config.vapidDetails,
        TTL: 3600,
        headers: {
            "content-type": "text/html"
        }
    }).then(
        function (resData) {
            return callback(null, resData);
        },
        function (err) {
            return callback(err, null);
        }
    ).catch(function (ex) {
        return callback(new Error(ex), null);
    }
    );
}