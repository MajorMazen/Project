const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-url');

const LinksSchema = new Schema({

    linkurl: {
        type: mongoose.SchemaTypes.Url,
        required: true
    },

    linktitle: {
        type: Schema.Types.String, required: false
    },

    linktopics: [{ type: Schema.Types.String, required: false, default: {} }],

});

//export it as an output
module.exports = Link = mongoose.model("links", LinksSchema);
