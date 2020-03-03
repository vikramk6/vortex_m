uniqid = require('uniqid');
var fs = require('fs');
var config =require('../config/config.json')

var HomeContentModel = require('../model/contentmodel'),
    HomeHeaderModel = require('../model/homeHeaderModel'),
    Imageupload = require('../utilities/imageUpload'), imageUpload;

function HomeContentController() {
    this.model = new HomeContentModel();
    this.header = new HomeHeaderModel();
}
function subdataa(data,callback){
    var _self = this; 
   this.model.subcatdata(data._id,function(err,response){
 callback(err,response,data)
 })
}

HomeContentController.prototype.getAll = function (req, res) {
var count=0
    var _self = this;
    _self.header.get(req, function (headErr, headerdata) {
    if(headerdata) {
    _self.model.aggregate(req, function (err, da) {
    for(i=0;i < da.length;i++){
        _self.model.subcatdata(da[i],function(err,response,data){
      console.log("response",response)
     obj = { ...data}

      obj. _doc.subdata= response;
              
        count++
         if(da.length == count){
        res.status(200).json({ status:200, header: headerdata[0].home_header, background_image: headerdata[0].background_image, background_color: headerdata[0].background_color,response:da,"image_path":config.image_path});
         }
      })
        }
        
      })
    }
      
    })
    
  };

HomeContentController.prototype.subcontentdata=function(req,res){

 let _self = this
 _self.model.subcontentdata(req.body,(err,response)=>{
 if(err){
 res.status(200).json({"status":400,"err_field":"something went to worng","response":""})
 }
 else{
  res.status(200).json({"status":200,"err_field":"","response":response})
 }

 })
 
}
HomeContentController.prototype.getId = function (req, res) {
    this.model.getId(req, function (err, data) {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
    });
};

HomeContentController.prototype.create = function (req, res, next) {
    if (!req.body.content_name) {
        res.status(200).json({ status: '400', message: "Please provide content_name" });
    } else if (!req.body.content_image) {
        res.status(200).json({ status: '400', message: "Please provide content_image" });
    } else if (!req.body.content_text) {
        res.status(200).json({ status: '400', message: "Please provide content_text" });
    } else {
        let _self = this
        Imageupload.imageUpload(req.body.content_image, function (err, data) {
            if (err) {
                res.status(200).json({ status: '400', message: "Something went wrong" });
            } else if (data) {
                req.body.content_image = data;
                if (req.body.background_image) {
                    Imageupload.imageUpload(req.body.background_image, function (berr, bdata) {
                        if (berr) {
                            res.status(200).json({ status: '400', message: "Something went wrong" });
                        } else if (bdata) {
                            req.body.background_image = bdata;
                            _self.model.create(req, function (cdata) {
                                res.status(200).json(cdata);
                            });
                        }
                    });

                } else {
                    _self.model.create(req, function (cdata) {
                        res.status(200).json(cdata);
                    });
                }
            }
        })
    }
};

HomeContentController.prototype.update = function (req, res, next) {
    let _self = this;
    if (req.body.content_image) {
        Imageupload.imageUpload(req.body.content_image, function (err, data) {
            if (err) {
                res.status(200).json({ status: '400', message: "Something went wrong" });
            } else if (data) {
                req.body.content_image = data;
                _self.model.update(req, function (udata) {
                    res.status(200).json(udata);
                });
            }
        });
    } else {
        this.model.update(req, function (data) {
            res.status(200).json(data);
        });
    }
};

HomeContentController.prototype.remove = function (req, res, next) {
    this.model.remove(req, function (data) {
        res.status(200).json(data);
    });
};
HomeContentController.prototype.removecontent= function (req, res, next) {
    this.model.removecontent(req, function (data) {
        res.status(200).json(data);
    });
};
HomeContentController.prototype.savecontentparagraph=function(req,res){

this.model.savecontentparagraph(req.body,function(err,response){
if(err){

res.status(200).json({"status":400,"err_field":"some thing went to wormg","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response})
}
})
}
HomeContentController.prototype.deletecontentparagraph=function(req,res){
this.model.deletecontentparagraph(req.body,function(err,response){
if(err){

res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response})
}
})
}
HomeContentController.prototype.updateparagrah=function(req,res){
this.model.updateparagrah(req.body,function(err,response){
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response})
}
})
}
HomeContentController.prototype.savecontentimage=function(req,res){
if(req.body.image){
this.model.countimage(req.body,(err,data)=>{
if(data.length>=3){
res.status(200).json({"status":400,"err_field":"soory ,You have exceeded image limit ","result":""})
}else{
         let d = new Date();
            let time = d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds()
            let image_name = time + "_" + uniqid() + ".png";
            let imagePath = "./images/" + image_name;
            let db_path = image_name;
            fs.writeFileSync(imagePath, req.body.image, 'base64');
            req.body.image= db_path
this.model.savecontentimage(req.body,function(err,response){
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response})
}
})
}
})

}else{
this.model.countparagraph(req.body,(err,data)=>{
if(data.length>=3){
res.status(200).json({"status":400,"err_field":"soory ,You have exceeded paragraph limit ","result":""})
}else{
this.model.savecontentimage(req.body,function(err,response){
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response})
}

})
}
})
}
}
HomeContentController.prototype.deletecontentimage=function(req,res){
this.model.deletecontentimage(req.body,(err,reponse)=>{
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":reponse})
}
})
}
HomeContentController.prototype.updatecontentimage=function(req,res){
console.log(req.body)
if(req.body.image){
    let d = new Date();
            let time = d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds()
            let image_name = time + "_" + uniqid() + ".png";
            let imagePath = "./images/" + image_name;
            let db_path = image_name;
            fs.writeFileSync(imagePath ,req.body.image, 'base64');
            req.body.image = db_path
this.model.updatecontentimage(req.body,(err,response)=>{
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response})
}
})
}else{
this.model.updatecontentimage(req.body,(err,response)=>{
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response})
}
})
}
}

HomeContentController.prototype.contentlink=function(req,res){
this.model.contentlink(req.body, (err,response)=>{
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response})
}
})
}
HomeContentController.prototype.getcatagiries=function(req,res){

this.model.getcatagiries((err,resonse)=>{
console.log(err,resonse)
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":resonse})
}
})
}
HomeContentController.prototype.gettrementcatagiries=function(req,res){
this.model.gettrementcatagiries((err,resonse)=>{
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":resonse})
}
})
}
HomeContentController.prototype.gelinkcontentdata =function(req,res){
this.model.gelinkcontentdata(req.body,(err,response)=>{
console.log(err,response)
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response,"image_path":config.image_path})
}
})
}
HomeContentController.prototype.getcontentlink=function(req,res){
this.model.getcontentlink(req.body,(err,response)=>{
console.log(err,response)
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response,"image_path":config.image_path})
}
})
}
HomeContentController.prototype.updatecontentlink=function(req,res){
this.model.updatecontentlink(req.body,(err,response)=>{
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})

}else{
res.status(200).json({"status":200,"err_field":"","result":response})
}

})
}

var stripe = require('stripe')("sk_test_RWZBmUHV4Ib66jnV35uaCF5N00oPHySZbE");
HomeContentController.prototype.charge=function (req,res){
var amount=200;

	console.log(req.body);
stripe.customers.create({
     email: req.body.stripeEmail,
     source: req.body.stripeToken,
	 
	 
  },function(err,customer){
  	if(err){
  	res.send("customer error"+err);
  	}else{
	 stripe.charges.create({
			amount:parseFloat(amount)*100,
			currency: "SEK",
			customer: customer.id
	  },function(err,charge){
		  if(err)
		  {
			 res.status(200).json({"status":"400","err_field":"payment failed,please try again","message":"payment failed,please try again","result":""})
			  
		  }else{
		  	
		  	res.status(200).json({"status":"200","err_field":"","result":"your payment processed successfully","meassage":"your payment processed successfully"})
		  }
	})
  	}
  	
  })

}
module.exports = HomeContentController