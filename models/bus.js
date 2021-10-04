const mongo = require("mongoose");

const bus = mongo.Schema({
    driverId: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true
    },
    routeName: {
        type: String,
        require: true
    },
    busRegistration: {
        type: String
    },
    seatCapacity: {
        type: Number
    }
})

module.exports = mongo.model("bus", bus);