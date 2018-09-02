const axios = require("axios");
const express = require('express');


const pagetitle = async (url, fn) => {
    try {
        const response = await axios.get(url); //promise have to be awaited
        const data = response.data;

        var i1 = data.indexOf('title'); i1 += 6;
        var i2 = data.indexOf('</title');

        if (i1 > -1 && i2 > -1) {
            const title = data.substring(i1, i2);
            fn(title); //retrieved value through a callback fn
        }
        else {
            fn(url);//title tags not located
        }

    } catch (error) {
        fn(null); //page not found
    }
};

// let x = null;
// pagetitle('https://www.indiatoday.in/amp/india/story/anil-ambani-asks-congress-to-shut-up-on-rafale-deal-1320238-2018-08-22?ref=taboola', (res) => {
//     if (res) {
//         this.x = res;
//         console.log(this.x);//can't be returned, assignment will execute before promise is resolved, only used in this scope
//     }
//     else {
//         console.log("Invalid URL")
//     }
// })

// let x = null;
// pagetitle('https://www.indiatoday.in/amp/india/story/anil-ambani-asks-congress-to-shut-up-on-rafale-deal-1320238-2018-08-22?ref=taboola', (res) => {
//     if (res) {
//         this.x = res;
//         console.log(this.x);//can't be returned, assignment will execute before promise is resolved, only used in this scope
//     }
// })

//OR if takes only url and title returned
// let x = null;
// pagetitle('https://www.indiatoday.in/amp/india/story/anil-ambani-asks-congress-to-shut-up-on-rafale-deal-1320238-2018-08-22?ref=taboola').then(out => {
//     this.x = out;
//     console.log(this.x);
// })

module.exports = pagetitle;

//https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string

//async functions return promises, those have to be either retrieved through a callback
//or awaited, for that the wrapper function would also have to be async, the obj (resolved promise) can be used 
//within the function, but if returned, will be returned as a promise (output of an async func, i.e. deadlock)
//assignment to the async function ex. let x= pagetitle..., or this.x= res....
//happens before the function finishes execution, so direct use of that variable/promise is useless
//let x= await pagetitle, can't happen since it's not an async func


// var app = express();
// var router = express.Router();
// app.use('', router);




