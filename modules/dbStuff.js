const mongoose = require('mongoose');
const {promiseStatus} = require('promise-status-async');


const todoSchema=new mongoose.Schema({
  content:{type:String,required:true}
});

async function connect(uri){
  await mongoose.connect(uri).then(function() {
    console.log("Successfully connected!");
  });
}

async function readFromCollection(collectionName){
  const todoModel=await mongoose.model("todoModel",todoSchema,collectionName);
  const docs=await todoModel.find({});
  let arr=[];
  await docs.forEach(function(doc){
    arr.push(doc.content);
  });
  return arr;
}

async function addToCollection(collectionName,item){
  const todoModel=await mongoose.model("todoModel",todoSchema,collectionName);
  const todo=new todoModel({
    content:item
  });
  todo.save();
}

async function deleteFromCollection(collectionName,item){
  const todoModel=await mongoose.model("todoModel",todoSchema,collectionName);
  await todoModel.deleteOne({content:item});
}

//tht was hard af
async function readCollections(){
  const cols= await mongoose.connection.db.listCollections();
  return cols;
}

async function deleteCollection(collectionName){
  await mongoose.connection.db.dropCollection(collectionName);
}

//exports:
module.exports.connect=connect;
module.exports.readFromCollection=readFromCollection;
module.exports.addToCollection=addToCollection;
module.exports.deleteFromCollection=deleteFromCollection;
module.exports.readCollections=readCollections;
module.exports.deleteCollection=deleteCollection;
