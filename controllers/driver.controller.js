const driver = require("../models/driver");

const create = async (req,res) => {
    await driver.create({
        name: req.body.name,
        email: req.body.email,
        nic: req.body.email
    })
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
    driver.findOne({_id: req.params.id })
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

const getByName = async (req,res) => {
    driver.findOne({name: req.body.name })
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

const update = async (req,res) => {
    await driver.findOneAndUpdate({_id: req.params.id}, {
        name: req.body.name,
        email: req.body.email,
        nic: req.body.email
    })
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

module.exports = { create, getAll, getById, getByName, update };