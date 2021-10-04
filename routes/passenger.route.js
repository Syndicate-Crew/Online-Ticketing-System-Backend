const controller = require("../controllers/passenger.controller");
const router = require("express").Router();

router.route("/").get(controller.temp);

module.exports = router;