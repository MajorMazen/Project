const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-url');

const PostsSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    userid: {
        type: Schema.Types.ObjectId, ref: "users", required: true
    },

    linktitle: {
        type: Schema.Types.String, required: false
    },

    linkurl: {
        type: mongoose.SchemaTypes.Url,
        required: true
    },

    linktopics: [{ type: Schema.Types.String, required: false, default: {} }],

    date: {
        type: Date,
        default: Date.now()
    },
});

//export it as an output
module.exports = Post = mongoose.model("posts", PostsSchema);
