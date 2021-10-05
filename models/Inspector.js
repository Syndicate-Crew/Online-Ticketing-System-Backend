const mongo = require("mongoose");

const inspector = new mongo.Schema({
    employeeId: {
        type: String,
        require: true
    },
    driverLicenceId: {
        type: String,
        require: true
    }
});

module.exports = mongo.model("inspector", inspector);