const router = require("express").Router();
const controller = require("../controllers/journey.controller");
const auth = require("../middleware/passenger.auth")

router.route("/").get(controller.getAll);

router.route("/:id").get(controller.getById);

router.route("/passenger/:id").get(controller.getByPassenger);

router.route("/").post(controller.create);

router.route("/").put(auth, controller.update);

module.exports = router;