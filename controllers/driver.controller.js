const driver = require("../models/driver");
const employee = require("../models/Employee");
const { search } = require("../routes/bus.route");

const create = async (req,res) => {
    await employee.create({
        name: req.body.name,
        email: req.body.email,
        nic: req.body.email
    })
    .then(result => {
        return driver.create({
            employeeId: result._id,
            driverLicenceId: req.body.driverLicenceId
        })
    })
    .then(result => {
        res.json({
            status: "successful"
        })
    })
    .catch(err => {
        res.json({
            status: "error",
            error: err
         })
    })
    
}

const getAll = async (req,res) => {
    await driver.find()
    .then(result => {
        res.json({
            status: "successful",
            result: result
        })
    })
    .catch(err => {
        res.json({
           status: "error",
           error: err
        })
    })
}

const getById = async (req,res) => {
    const search = {
        id: "",
        name: "",
        email: "",
        nic: "",
        driverLicenceId: ""
    }
    await employee.findOne({_id: req.params.id })
    .then(result => {
        search.id = result._id
        search.name = result.name
        search.email = result.email
        search.nic = result.nic

        return driver.findOne({employeeId: result._id })
    })
    .then(result => {
        search.driverLicenceId = result.driverLicenceId
        res.json({
            status: "successful",
            result: search
        })
    })
    .catch(err => {
        res.json({
           status: "error",
           error: err
        })
    })
}

const update = async (req,res) => {
    await employee.findOneAndUpdate({_id: req.params.id}, {
        name: req.body.name,
        email: req.body.email,
        nic: req.body.email
    })
    .then(result => {
        return driver.findOneAndUpdate({employeeId: req.params.id}, {
            driverLicenceId: req.body.driverLicenceId
        })
    })
    .then(result => {
        res.json({
            status: "successful",
        })
    })
    .catch(err => {
        res.json({
           status: "error",
           error: err
        })
    })
}

module.exports = { create, getAll, getById, update };