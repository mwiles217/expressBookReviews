const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  return res.send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let i=parseInt(req.params.isbn)
  let b=books[i];
  return res.send(JSON.stringify(b,null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author=req.params.author;
  console.log("Looking for: " + author);
  for(const isbn in books){
    let bk=books[isbn];
    if(bk.author==author){
      return res.send(JSON.stringify(bk,null,4));
    }
  }
  return res.send("not found");
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title=req.params.title;
  console.log("Looking for: " + title);
  var found=false;
  for(const isbn in books){
    let bk=books[isbn];
    if(bk.title==title){
      return res.send(JSON.stringify(bk,null,4));
    }
  }
  return res.send("not found");
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn=parseInt(req.params.isbn)
  let bk=books[isbn];
  if(bk){
  let review=bk.reviews;
  return res.send(JSON.stringify(review,null,4));
  }
  return res.send("Not Found")
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
