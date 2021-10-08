const router = require("express").Router();
const controller = require("../controllers/journey.controller");
const auth = require("../middleware/passenger.auth")

router.route("/").get(controller.getAll);

router.route("/:id").get(controller.getById);

router.route("/").post(controller.create);

router.route("/:id").put(controller.update);

module.exports = router;