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
        nic: req.body.nic,
        creditBalance: 0.00,
        image: req.file.filename

    }).then(result => {
        jwt.sign({passenger: { id: result._id }}, config.get("jwtsecret"),{ expiresIn: 3600 }, (err, token) => {
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
        res.json(result);
    })
}
    
const signIn = async (req,res) => {
    await passenger.findOne({email: req.body.email})
    .then(result => {
        if (bcrypt.compareSync(req.body.password,result.password)) {
            jwt.sign({passenger: { id: result._id }}, config.get("jwtsecret"),{ expiresIn: 3600 }, (err, token) => {
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
        } else {
            throw Error("Password mismatch");
        }
    })
    .catch(err => {
        res.json({
            error: "Password mismatch"
        });
    })
}

const getAll = async (req,res) => {
    await passenger.find().select("-password")
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

const getById = async (req,res) => {
    await passenger.findOne({_id: req.params.id}).select("-password")
    .then(result => {
        if (result) {
            res.json({
                status: "successful",
                result: result
            })
        } else {
            res.json({
                status: "not-available"
            });
        }
    })
    .catch(err => {
        res.json({
            status: "error",
            error: err
        })
    })
}

const auth = async (req,res) => {
    await passenger.findOne({_id: req.passenger.id}).select("-password")
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

const addCredit = async (req,res) => {
    await passenger.findOne({_id: req.passenger.id})
    .then(result => {
        const { creditBalance } = result
        return passenger.findOneAndUpdate({_id: req.passenger.id}, {creditBalance: creditBalance + req.body.price}).select("_id")
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
        });
    })
}

const updateInfo = async (req,res) => {
    const { name, email, nic } = req.body;
    await passenger.findOneAndUpdate({_id: req.passenger.id}, {
        name: name,
        email: email,
        nic: nic
    })
    .then(result => {
        if (result) {
            res.json({
                status: "successful",
            })
        } else {
            res.json({
                status: "not-available"
            });
        }
    })
    .catch(err => {
        res,json({
            status: "error",
            error: err,
        });
    })
}

const updateImage = async (req,res) => {
    await passenger.findOneAndUpdate({_id: req.passenger.id}, {
        image: req.file.filename
    })
    .then(result => {
        if (result) {
            res.json({
                status: "successful",
            })
        } else {
            res.json({
                status: "not-available"
            });
        }
    })
    .catch(err => {
        res,json({
            status: "error",
            error: err,
        });
    })
}

module.exports = {create, signIn, getAll, getById, auth, addCredit, updateInfo, updateImage};