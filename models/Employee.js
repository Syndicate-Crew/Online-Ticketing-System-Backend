const mongo = require("mongoose");

const employee = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    }
});

module.exports = mongo.model("employee", employee);