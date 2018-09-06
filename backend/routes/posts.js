const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const gravatar = require('gravatar');
const User = require('../models/User');
const Post = require('../models/Post');
const Link = require('../models/Link');
//include those for hashing tokens in arguemnt: secret
const keys = require('../config/keys');
// include to protect your private route from being accessed through sending and validating tokens
const passport = require('passport');
const jwt = require('jsonwebtoken');
// var request = require('request');
// var cheerio = require('cheerio');
const pagetitle = require('../title')


router.post('/post', passport.authenticate('jwt', { session: false }), (req, res) => {

    Link.findOne({ linkurl: req.body.linkurl }).then(exlink => {
        if (exlink) {
            const newPost = new Post({
                username: req.user.name,
                userid: req.user._id,
                linkid: exlink._id,
                linkurl: req.body.linkurl,
                linktitle: exlink.linktitle,
                linktopics: exlink.linktopics
            }).save().then(post => { return res.status(200).json(post) })
                .catch(err => { return res.status(400).json({ message: "Error sending post" }); });//catch post.save

        } else {
            pagetitle(req.body.linkurl.toString(), (title, keywords) => {
                if (title) {
                    if (!keywords) keywords = {};
                    const newLink = new Link({
                        linkurl: req.body.linkurl,
                        linktitle: title,
                        linktopics: keywords
                    }).save().then(link => {
                        if (link) {
                            const newPost = new Post({
                                username: req.user.name,
                                userid: req.user._id,
                                linkid: link._id,
                                linkurl: link.linkurl,
                                linktitle: link.linktitle,
                                linktopics: link.linktopics
                            }).save().then(post => { return res.status(200).json(post) })
                                .catch(err => { return res.status(400).json({ message: "Error sending post" }); });//catch post.save
                        }

                    }).catch(err => { return res.status(400).json({ message: "Error sending post" }); });//catch link.save
                }
                else { return res.status(400).json({ message: "Invalid URL" }); } //pagetitle (axios get) error
            })
        }

    }).catch(err => { return res.status(400).json({ message: "Error sending post" }); });//catch findOne
});

// router.post('/link', (req, res) => {
//     const newLink = new Link({
//         linkurl: req.body.link,
//     }).save().then(link => {
//         linkid = link._id;
//         res.json(link);
//     }).catch(err => { console.log(err); return res.status(400).json({ message: "Error posting link" }); });//if not  
// });


router.post('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Post.findById(req.params.id).then(post => {
        if (post) {
            if (post.userid.equals(req.user._id)) {
                Post.findByIdAndRemove(req.params.id).then(() => { return res.status(200).json({ id: req.params.id }); })
                    .catch(err => { return res.status(400).json({ message: "Error deleting post" }); });
            }
            else { return res.status(400).json({ message: "Unauthorized" }); }

        } else {
            return res.status(400).json({ message: "Post doesn't exist" });
        }
    }).catch(err => { return res.status(400).json({ message: "Error deleting post" }); });
});


router.get('/user/:id', (req, res) => {

    User.findById(req.params.id).then(user => {
        if (user) {
            Post.find({ userid: user._id }, null, { sort: { date: -1 } }).then(post => { return res.status(200).json(post) })
                .catch(err => { return res.status(400).json({ message: "Error retrieving posts" }); });

        } else {
            return res.status(400).json({ message: "User doesn't exist" });
        }
    }).catch(err => { return res.status(400).json({ message: "Error retrieving posts" }); });
});


router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.find({ userid: req.user._id }, null, { sort: { date: -1 } }).then(post => { return res.status(200).json(post) })
        .catch(err => { return res.status(400).json({ message: "Error retrieving posts" }); });
});


router.get('/post/:id', (req, res) => {
    Post.find({ _id: req.params.id }).then(post => { return res.status(200).json(post) })
        .catch(err => { return res.status(400).json({ message: "Error retrieving post" }); });
});


router.get('/topic/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Link.find({ linktopics: req.params.name }).then(links => {
        const linkids = links.map(link => (link._id))
        Post.find({ linkid: linkids }).then(posts => { return res.status(200).json(posts) })
            .catch(err => { return res.status(400).json({ message: "Error retrieving posts" }); }) //post find catch
    }).catch(err => { return res.status(400).json({ message: "Error retrieving posts" }); })//link find catch
})

// router.get('/recent', passport.authenticate('jwt', { session: false }), (req, res) => {
//     Post.find({ userid: req.user._id }, null, { sort: { date: -1 } }).then(post => { return res.status(200).json(post) })
//         .catch(err => { return res.status(400).json({ message: "Error retrieving posts" }); });
// });








// router.post('/title', (req, res) => {
//     if (req.body.linkurl) {
//         request(req.body.linkurl, (error, response, body) => {
//             if (!error && response.statusCode == 200) {
//                 const $ = cheerio.load(body);
//                 const webpageTitle = $("title").text();
//                 const metaDescription = $('meta[name=description]').attr("content");
//                 const webpage = {
//                     title: webpageTitle,
//                     metaDescription: metaDescription
//                 }
//                 res.send(webpage);
//             }
//         });
//     }
// });


module.exports = router;

