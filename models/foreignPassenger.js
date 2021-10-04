const mongo = require("mongoose");

const foreignPassenger = mongo.Schema({
    passengerId: {
        type: Object,
        require: true
    },
    passport: {
        type: String,
        require: true
    },
    creditCard: {
        type: Number
    }
})

module.exports = mongo.model("foreignPassenger", foreignPassenger)