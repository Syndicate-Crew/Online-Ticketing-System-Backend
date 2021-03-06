const foreign = require("../models/foreignPassenger");
const passenger = require("../models/passenger");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config")

const create = async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)

    await passenger.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
        image: req.file.filename

    }).then(result => {
        return foreign.create({
            passengerId: result._id,
            passport: req.body.passport,
            creditCard: req.body.creditCard
        })
    })
    .then(result => {
        jwt.sign({passenger: { id: result.passengerId }}, config.get("jwtsecret"),{ expiresIn: 3600 }, (err, token) => {
            if (err) {
                throw err;
            }
            else {
                res.json({
                    status: "successful",
                    token
                });
            }
        });
    })
    .catch(result => {
        res,json({
            status: "error",
            error: err,
        });
    })
}

const getById = async (req, res) => {
    const search = {
        _id: "",
        name: "",
        email: "",
        image: "",
        passport: "",
        creditCard: "",
    }
    await passenger.findOne({_id: req.params.id}).select("-password")
    .then(result => {

        search._id = result._id,
        search.name = result.name,
        search.email = result.email,
        search.image = result.image
        return foreign.findOne({passengerId: result._id});
    })
    .then(result => {
 
        search.passport = result.passport
        search.creditCard = result.creditCard

        res.json({
            status: "successful",
            result: search
        })
    })
    .catch(err => {
        res.json({
            status: "error",
            error: err,
        });
    })
}

const updateInfo = async (req, res) => {
    const { name, email, passport, creditCard } = req.body;
    await passenger.findOneAndUpdate({_id: req.passenger.id},{
        name: name,
        email: email
    })
    .then(result => {
        return foreign.findOneAndUpdate({passengerId: result._id}, {
            passport: passport,
            creditCard: creditCard
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
            error: err,
        });
    })
}


const getAll = async (req,res) => {
    await foreign.find().select("-password")
    .then(result => {
        res.json({
            status: "successful",
            result: result
        });
    })
    .catch(err => {
        res.json({
            status: "error",
            error: err 
        })
    })
}

module.exports = { create, updateInfo, getAll, getById };