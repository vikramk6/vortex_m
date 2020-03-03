var userOptionsSchema = require('./schemas/UserOptionsSchema');
var mongoose=require('mongoose');
var ObjectId=mongoose.Types.ObjectId;
function UserQuesOptionsModel () {
    
}

UserQuesOptionsModel.prototype.create = function (req, callback) {
console.log("teja...",req.body)
    userOptionsSchema.create(req.body, callback)
}

UserQuesOptionsModel.prototype.getAllQuestionaireOptions = function (callback) {
    userOptionsSchema.aggregate([
{
    $lookup : {
        from:'users',
        localField:'user_id',
        foreignField:'_id',
        as:'user_details'
    }
    }
], callback)
}

UserQuesOptionsModel.prototype.getQuesByUserId = function (req, callback) {
    userOptionsSchema.find({user_id: req.user_id, question_id: req.question_id},callback)
    
}
UserQuesOptionsModel.prototype.getuserquestion =function(data,callback){
console.log(data._id)
userOptionsSchema.aggregate([{$match:{slot_id:ObjectId(data._id)}},{
    $lookup : {
        from:'questionares',
        localField:'question_id',
        foreignField:'_id',
        as:'quations'
    }
    }],callback)
}
module.exports = UserQuesOptionsModel;