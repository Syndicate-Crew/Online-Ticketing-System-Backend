const mongo = require("mongoose");

const driver = new mongo.Schema({
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

module.exports = mongo.model("driver", driver);