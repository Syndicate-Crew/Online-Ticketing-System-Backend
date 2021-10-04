const controller = require("../controllers/driver.controller");
const router = require("express").Router();

router.route("/").get(controller.getAll);

router.route("/:id").get(controller.getById);

router.route("/getByName").get(controller.getByName);

router.route("/").post(controller.create);

router.route("/:id").put(controller.update);

module.exports = router;