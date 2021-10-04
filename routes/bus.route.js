const controller = require("../controllers/bus.controller");
const router = require("express").Router();

router.route("/").get(controller.getAll);

router.route("/:id").get(controller.getById);

router.route("/").post(controller.create);

router.route("/:id").put(controller.update)

module.exports = router;