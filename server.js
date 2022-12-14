const express = require('express');
const ejs = require('ejs');
const date=require(__dirname+"/modules/date.js");
const mongoose = require('mongoose');
const dbStuff = require(__dirname+'/modules/dbStuff.js');

// const uri="mongodb://localhost:27019/appDB";  use for local mongodb server
const uri ="mongodb+srv://zen900220:6ToT6qvog1p0eILy@cluster0.hbnjl.mongodb.net/todoDB?retryWrites=true&w=majority";

dbStuff.connect(uri);

const app=express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

let todoList=[];

//this was fkin hard to do!!!
app.get("/",async function(req,res){
  let listArr=[];
  dbStuff.readCollections().then(function(lists){
    lists.toArray(function(err,collections){
      if(err){
        console.log(err);
      }else{
        collections.forEach(function(collection){
          listArr.push(collection.name);
        });
        res.render("intro",{listNames:listArr});
      }
    })
  })
})

app.post("/",function(req,res){
  const item=req.body.newItem;
  const collection=req.body.Add;
  dbStuff.addToCollection(collection,item).then(function(){
    res.redirect("/"+collection);
  })
})

app.get("/:listName",function(req,res){
  dbStuff.readFromCollection(req.params.listName).then(function(todoList){
    res.render("todo",{title:req.params.listName,list:todoList});
  })
})

app.post("/makeList",function(req,res){
  res.redirect("/"+req.body.listName);
})

app.post("/delete",function(req,res){
  const collection=req.body.title;
  const content=req.body.content;
  dbStuff.deleteFromCollection(collection,content).then(function(){
    res.redirect("/"+collection);
  })
})
//complete this
app.post("/deleteList",function(req,res){
  dbStuff.deleteCollection(req.body.listName).then(function(){
    res.redirect("/")
  });
})

app.listen(process.env.PORT||3000,function(){
  console.log("Listening on port 3000");
});
