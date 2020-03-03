const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const saltval = 10
//var ObjectId = Schema.ObjectId;



var Schema = mongoose.Schema;

var images=new Schema({
    image:{
        type: String,
        default: ''
    }
    
})
var userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        //required: true

    }, email: {
        type: String,
        //required: true,
        //unique: true

    }, dateofbirth: {
        type: String,
        default: ''
    }, gender: {
        type: String,
        default: ''
    }, phonenumber: {
        type: String,
        default: ''
    }, password1: {
        type: String,
        //required: true
        default: ''
    },
    userImage:[images] ,
    profile: {
        type: String,
        default: ''
    }, logintype: {
        type: String,
        default: 'Normal'

    }, autharizationid: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: new Date()
    },
    userType: {
        type: 'String',
       // require: true,
         default: 'user'
    },
    role:{
        type: 'String',
         default: '' 
    }



})
/**
 * description:to used to the  creation of indexs
 */
userSchema.index({ email: 1 })
var User = mongoose.model('User', userSchema)

module.exports = User;