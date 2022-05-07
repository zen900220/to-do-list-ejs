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


app.get("/",function(req,res){
  res.render("intro");
})

app.post("/",async function(req,res){
  const item=req.body.newItem;
  const collection=req.body.Add;
  await dbStuff.addToCollection(collection,item);
  res.redirect("/"+collection);
})

app.get("/:listName",async function(req,res){
  todoList=await dbStuff.readCollection(req.params.listName);
  res.render("todo",{title:req.params.listName,list:todoList});
})

app.post("/makeList",function(req,res){
  res.redirect("/"+req.body.listName);
})

app.post("/delete",async function(req,res){
  const collection=req.body.title;
  const content=req.body.content;
  await dbStuff.deleteFromCollection(collection,content);
  res.redirect("/"+collection);
})

// app.post("/reset_list",function(req,res){
//   list=[];
//   res.redirect("/");
// });

app.listen(process.env.PORT||3000,function(){
  console.log("Listening on port 3000");
});
