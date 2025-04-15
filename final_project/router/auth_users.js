const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username: "user12",password: "pwd12"}]


// Check if a user with the given username already exists
const isValid = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}
// const isValid = (username)=>{ //returns boolean
// //write code to check is the username is valid
// }

// Check if the user with the given username and password exists
const authenticatedUser = (username, password) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}


//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});

  const username = req.body.username;
  const password = req.body.password;



  // Check if username or password is missing
  if (!username || !password) {
      return res.status(404).json({ message: "Error logging in" });
  }

  // Authenticate user
  if (authenticatedUser(username, password)) {
      // Generate JWT access token
      let accessToken = jwt.sign({
          data: password
      }, 'access', { expiresIn: 60 * 60 });

      // Store access token and username in session
      req.session.authorization = {
          accessToken, username
      }
      return res.status(200).send("User successfully logged in");
  } else {
      return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

regd_users.post("/register", (req,res) => {
const username = req.body.username;
const password = req.body.password;
// Check if both username and password are provided
if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
        // Add the new user to the users array
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
        return res.status(404).json({message: "User already exists!"});
    }
}
// Return error if username or password is missing
return res.status(404).json({message: "Unable to register user."});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn=parseInt(req.params.isbn);
  let bk=books[isbn];
  if(!bk){
    res.send("No book found")
  }
  let user=req.session.authorization.username;
  let reviews=bk.reviews;

  let r=reviews[user];
  if(r){
    delete reviews[user];
  }
  r={
     review: req.body.review
  }
  reviews[user]=r;

  return res.send(JSON.stringify(bk,null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    let isbn=parseInt(req.params.isbn);
    let bk=books[isbn];
    if(!bk){
      res.send("No book found")
    }
    let user=req.session.authorization.username;
    let reviews=bk.reviews;
  
    let r=reviews[user];
    if(r){
      delete reviews[user];
    }  
    return res.send(JSON.stringify(bk,null,4))
    //return res.status(300).json({message: "Yet to be implemented"});
  });
  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
