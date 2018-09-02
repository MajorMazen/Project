const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const posts = require('./routes/posts');

const User = require('./models/User');
const Post = require('./models/Post');

const cors = require('cors')
// Allowing private routes (users should be logged in with a valid token to view)
const passport = require('passport');

//start the server
const app = express();

// Body parser middleware
// Enable json processing and cors for local server calls
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);


// connection string
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//test API in postman on: http://localhost:5000/ to see hello json
//app.get('/', (req, res) => res.json({ msg: "hello my name is" }));
app.get('/about', (req, res) => res.send("Our company was founded in 2015"));
app.use('/users', users);
app.use('/posts', posts);


app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.find({ userid: req.user.following }, (err, posts) => {
    if (err) {
      return res.status(400).json({ message: "No posts to display" })
    }

    return res.status(200).json(posts);
  })
})//else will send unauthorized


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
