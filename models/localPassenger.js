const mongo = require("mongoose");

const localPassenger = mongo.Schema({
    passengerId: {
        type: Object,
        require: true
    },
    nic: {
        type: String,
        require: true
    },
    creditBalance: {
        type: Number
    }
})

module.exports = mongo.model("localPassenger", localPassenger)