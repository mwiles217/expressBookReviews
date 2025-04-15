const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});


/*
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // Simulate async DB call
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ];
      const user = users.find(u => u.id === id);
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
};

app.get('/api/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getUserById(id); // Call Promise and wait for resolution
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
*/
// Get the book list available in the shop

const  getbooks = () => {
  return new Promise((resolve, reject) => {    
        resolve(JSON.stringify(books,null,4));

  });
};

public_users.get('/', async(req, res) =>{
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const bks=await getbooks();
  return res.send(bks)
  //return res.send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
const  getbookisbn = (isbn) => {
  return new Promise((resolve, reject) => {
        let b=books[isbn];    
        resolve(JSON.stringify(b,null,4));

  });
};

public_users.get('/isbn/:isbn',async (req, res) => {
  //Write your code here
  let i=parseInt(req.params.isbn)
  let b=await getbookisbn(i);
  return res.send(b);
  //return res.status(300).json({message: "Yet to be implemented"});
 });



 // Get book details based on author
const  getbookauthor = (author) => {
  return new Promise((resolve, reject) => {
    console.log("Looking for: " + author);
    for(const isbn in books){
      let bk=books[isbn];
      if(bk.author==author){
        resolve(JSON.stringify(bk,null,4));
      }
    }
    resolve("not found");

  });
};
public_users.get('/author/:author',async (req, res) =>{
  let author=req.params.author;
  //console.log("Looking for: " + author);
  const bk=await getbookauthor(author);
  return res.send(bk);
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title

const  getbooktitle = (title) => {
  return new Promise((resolve, reject) => {
    console.log("Looking for: " + title);
    for(const isbn in books){
      let bk=books[isbn];
      if(bk.title==title){
        resolve(JSON.stringify(bk,null,4));
      }
    }
    resolve("not found");

  });
};

public_users.get('/title/:title',async (req, res) =>{
  //Write your code here
  let title=req.params.title;
  let bk=await getbooktitle(title)
  
  return res.send(bk);
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
