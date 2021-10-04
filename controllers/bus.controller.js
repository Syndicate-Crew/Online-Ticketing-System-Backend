const bus = require("../models/bus");

const create = async (req,res) => {
    await bus.create({
        driverId: req.body.driverId,
        owner: req.body.owner,
        routeName: req.body.routeName,
        busRegistration: req.body.busRegistration,
        seatCapacity: req.body.seatCapacity
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
    await bus.find()
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
    await bus.find({_id: req.params.id})
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
    await bus.findOneAndUpdate({_id: req.params.id}, {
        driverId: req.body.driverId,
        owner: req.body.owner,
        routeName: req.body.routeName,
        busRegistration: req.body.busRegistration,
        seatCapacity: req.body.seatCapacity
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

module.exports = { create, getAll, getById, update }