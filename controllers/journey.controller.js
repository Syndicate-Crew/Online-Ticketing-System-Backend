const journey = require("../models/journey");

const create = async (req,res) => {
    await journey.create({
        passengerId: req.passenger.id,
        busId: req.body.busId,
        journeyCode: req.body.journeyCode,
        departure: req.body.departure,
        destination: req.body.destination,
        departureTime: req.body.departureTime,
        destinationTime: req.body.destinationTime,
        date: req.body.date
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
    await journey.find()
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
    await journey.findOne({_id: req.params.id})
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

const getByPassenger = async (req,res) => {
    await journey.find({ passengerId: req.params.id})
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
    await journey.findOneAndUpdate({_id: req.passenger.id}, {
        journeyCode: req.body.journeyCode,
        busId: req.body.busId,
        departure: req.body.departure,
        destination: req.body.destination,
        departureTime: req.body.departureTime,
        destinationTime: req.body.destinationTime,
        date: req.body.date
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

module.exports = { create, getAll, getById, update, getByPassenger };