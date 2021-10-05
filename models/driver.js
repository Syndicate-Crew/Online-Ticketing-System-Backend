const mongo = require("mongoose");

const driver = new mongo.Schema({
    employeeId: {
        type: String,
        require: true
    },
    driverLicenceId: {
        type: String,
        require: true
    }
});

module.exports = mongo.model("driver", driver);