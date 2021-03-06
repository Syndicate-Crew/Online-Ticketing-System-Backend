const mongo = require("mongoose");

const passenger = mongo.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String
    }
});

module.exports = mongo.model("passenger", passenger)