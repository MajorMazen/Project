const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const gravatar = require('gravatar');
const User = require('../models/User');
//include those for hashing tokens in arguemnt: secret
const keys = require('../config/keys');
// include to protect your private route from being accessed through sending and validating tokens
const passport = require('passport');
const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
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
            .then(user => {

              //send token just like login ***
              const payload = { id: user.id, name: user.name };
              jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
                return res.status(200).json({ success: true, token: 'Bearer ' + token, name: user.name, email: user.email });
              }
              );
            })//if successful

            .catch(err => { return res.status(400).json({ message: "Registration error" }); });//if not
        });
      });
    }
  });
});


router.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  //optional: validate input keys (key-value pairs) or identifiers to avoid crashing the server
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email and password" });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ message: "User account does not exist" });
    }

    else {
      //use bcrypt to compare the entered password to the hashed db version
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //log them in
          const payload = { id: user.id, name: user.name };

          //tokens are also secured, are hashed through salt which i secretly define in keys.js
          // Sign Token
          jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
            return res.status(200).json({ success: true, token: 'Bearer ' + token, name: user.name, email: user.email });
          }
          );
        }

        else {
          return res.status(400).json({ message: "Passwords is invalid" });
        }
      })
    }
  })

});

//follow 
router.post("/follow/:id", passport.authenticate("jwt", { session: false }), (req, res) => {

  if (req.params.id === req.user._id) {
    return res.status(400).json({ message: "Restricted" });
  }

  const tofollowId = req.params.id;
  User.findById(tofollowId, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // console.log(req.user.findById);
    User.findById(req.user._id, (err, follower) => {
      let a = follower.following.indexOf(tofollowId);
      if (a == -1) {
        follower.following.push(user);
        follower.save().then(() => {

          //add to followers
          user.followers.push(follower);
          user.save().catch(e => { });
          return res.status(200).json({ id: req.params.id });
        });
      }
      else { return res.status(400).json({ message: "User already followed" }); }
    });
  });
}
);


router.post("/unfollow/:id", passport.authenticate("jwt", { session: false }), (req, res) => {

  User.findById(req.params.id, (err, toremove) => {
    if (err) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // console.log(req.user.findById);
    //add initial check for existing id before pushing
    User.findById(req.user._id, (err, user) => {
      let a = user.following.indexOf(req.params.id);
      if (a > -1) {
        user.following.splice(a, 1);
        user.save().then(() => {
          //remove from followers
          a = toremove.followers.indexOf(req.user._id);
          if (a > -1) {
            toremove.followers.splice(a, 1);
            toremove.save().catch(e => { });
          }
          return res.status(200).json({ id: req.params.id });
        });
      }
      // if (user) {
      //   user.following.filter(flist => flist._id != req.params.id);
      //   user.save().then(() => {
      //     return res.status(200).json({ message: "Success" });
      //   });
      // }
      else { return res.status(400).json({ message: "User already not followed" }); }
    });
  });
}
);

//check if user is following another
router.get("/myfollowing", passport.authenticate("jwt", { session: false }), (req, res) => {

  User.findById(req.user._id, (err, user) => {
    if (user) {
      return res.status(200).json(user.following);
    }
    else {
      return res.status(400).json({ message: "Error getting followers" });
    }
  })
})

router.get("/name/:id", (req, res) => {

  User.findById(req.params.id, (err, user) => {
    if (user) {
      return res.status(200).json({ name: user.name });
    }
    else {
      return res.status(400).json({ message: "User doesn't exist" });
    }
  })
})

//check if user is following another
// router.get("/following/:id", passport.authenticate("jwt", { session: false }), (req, res) => {

//   const tofollowId = req.params.id;
//   User.findById(tofollowId, (err, user) => {
//     if (err) {
//       return res.status(400).json({ message: "User does not exist" });
//     }

//     User.findById(req.user._id, (err, follower) => {
//       if (err) {
//         return res.status(400).json({ message: "User does not exist" });
//       }

//       let a = follower.following.indexOf(tofollowId);
//       if (a > -1) {
//         return res.status(200).json({ message: "true" });
//       }
//       else {
//         return res.status(200).json({ message: "false" });
//       }

//     })
//   })
// })


module.exports = router;