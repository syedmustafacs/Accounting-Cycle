var express = require('express');
var router = express.Router();
var model = require("../models");

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  
  // console.log(db.User);
  /*** User Created */
  model.User.create({
    firstname:"John",
    lastname:"Doe",
    dob:"01/01/2017",
    gender:"male",
    roleId:1
  }).then(function(res){
        console.log(res)
  });
  /*** */


  /**** User Found with Roles */
  model.User.find({
      include: [
        { model: model.Roles }
    ]
  }).then(function(resp){
    console.log(resp.Role);
  })
 
  
  res.send('respond with a resource');
});



/* Blog Creation. */
router.get('/blogs', function(req, res, next) {
  

/**** Blog Created ***/  
model.Blogs.create({
  name:"Tech 114 Blog",
  description:"Hello World"
}).then(function(blog){
  
  /**** Category Assignment */
  model.Categories.find({id:1}).then(function(category){
      blog.addCategory(category).then(function(t){
        res.send("Blog Created");
      }); 
  });

  
  
 });

});



router.get('/categories/blog',function(req,res){

   /*** Get Categories Blog ***/ 
   model.Categories.find({id:1},{
     include: model.Blogs
   }).then(function(category){
        category.getBlogs().then(function(blogs){
            res.json(blogs);
        });

         

   });

});

module.exports = router;
