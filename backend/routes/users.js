const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
// include for fetching personal profile pics
const gravatar = require('gravatar');
const User = require('../models/User');
//include those for hashing tokens in arguemnt: secret
const keys = require('../config/keys');
// include to protect your private route from being accessed through sending and validating tokens
const passport = require('passport');
// more convenient than cookies for separate front and back-end layers
// sends you a webtoken (key), which is valid for some time after signing in correctly
const jwt = require('jsonwebtoken');

// test on http://localhost:5000/<theStringYouDefineInServer.js>/test
router.get('/test', (req, res) =>
  res.json({ msg: "this is a test" }));

//post is an express fn, with a callback fn(req, res) as input with its body defined bet {}
// test on http://localhost:5000/<theStringYouDefineInServer.js>/register
//choose post and put the name, email, password in the body x-www-form section and hit send
router.post('/register', (req, res) => {

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      //user is created but not saved to the db
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      //password encryption
      bcrypt.genSalt(10, (err, salt) => {
        //function body, arguemnts are (err & salt) which are also retrieved after genSalt's finished
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()//attempt saving anyway
            .then(user => res.json(user))//if successful
            .catch(err => console.log(err));//if not
        });
      });
    }
  });
});


// test on http://localhost:5000/<theStringYouDefineInServer.js>/register
//choose post and put the email and password in the body x-www-form section and hit send
router.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  //optional: validate input keys (key-value pairs) or identifiers to avoid crashing the server
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email and password" });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ email: "User account does not exist" });

    }

    else {
      //use bcrypt to compare the entered password to the hashed db version
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //log them in
          //passport package protects your private route from being accessed, the token is personalised and expires, decoupled from application
          //tokens also can have data stored in them too (like retaining user name without constantly consulting the db)
          //can use cookies to store user data, cookies are browser based, we are decoupled, use webtokens instead
          const payload = { id: user.id, name: user.name };

          //tokens are also secured, are hashed through salt which i secretly define in keys.js
          // Sign Token
          jwt.sign(
            payload,
            keys.secret,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
                name: user.name
              });
            }
          );


        }

        else {
          return res.status(400).json({ email: "Passwords is invalid" });
        }
      })
    }
  })

});

//follow 
router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const followeeId = req.params.id;

    User.findById(followeeId, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // console.log(req.user.findById);
      User.findById(req.user._id, (err, follower) => {
        follower.followers.push(user);
        follower.save().then(() => {
          return res.status(200).json({ message: "Success" });
        });
      });
    });
  }
);

module.exports = router;