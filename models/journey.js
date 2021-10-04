const mongo = require("mongoose");

const journey = mongo.Schema({
    passengerId: {
        type: String,
        require: true
    },
    busId: {
        type: String,
        require: true
    },
    journeyCode: {
        type: Number,
        require: true
    },
    departure: {
        type: String,
        require: true
    },
    destination: {
        type: String,
        require: true
    },
    departureTime: {
        type: String
    },
    destinationTime: {
        type: String
    },
    date: {
        type: String
    }
})

module.exports = mongo.model("journey", journey)