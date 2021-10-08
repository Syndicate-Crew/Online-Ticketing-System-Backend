const local = require("../models/localPassenger");
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
        return local.create({
            passengerId: result._id,
            nic: req.body.nic,
            creditBalance: 0.00
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

const getById = async (req,res) => {
    await local.find({passengerId: req.params.id})
    .then(result => {
        res.json({
            status: "successful",
            result: result
        })
    }).catch(err => {
        res,json({
            status: "error",
            error: err,
        });
    })
}

const updateInfo = async (req, res) => {
    const { name, email, nic, creditBalance } = req.body;
    await passenger.findOneAndUpdate({_id: req.passenger.id},{
        name: name,
        email: email
    })
    .then(result => {
        return local.findOneAndUpdate({passengerId: result._id}, {
            nic: nic,
            creditBalance: creditBalance
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

const addCredit = async (req,res) => {
    await passenger.findOne({_id: req.passenger.id})
    .then(result => {
        return local.findOneAndUpdate({passengerId: result._id}, {
            $inc: {
                creditBalance: req.body.creditBalance
            }
        })
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
            error: err,
        });
    })
}

module.exports = { create, updateInfo, addCredit, getById };