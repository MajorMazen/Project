const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicsSchema = new Schema({
    topicname: {
        type: String,
        required: true
    },
});

//export it as an output
module.exports = Topic = mongoose.model("topics", TopicsSchema);
