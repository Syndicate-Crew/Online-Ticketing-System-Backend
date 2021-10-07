const controller = require("../controllers/passenger.controller");
const local = require("../controllers/localPassenger.controller");
const foreign = require("../controllers/foreignPassenger.controller")
const router = require("express").Router();
const auth = require("../middleware/passenger.auth");
const upload = require("../middleware/image.middleware").upload;

router.route("/").get(controller.getAll);

router.route("/:id").get(controller.getById);

router.route("/").post(controller.create);

// local passenger

router.route("/local").post(local.create);

router.route("/local").put(auth, local.updateInfo);

router.route("/local/AddCredit").put(auth, local.addCredit)

// foreign passenger

router.route("/foreign").post(foreign.create);

router.route("/foreign").put(auth, foreign.updateInfo);

// Common

router.route("/SignIn").post(controller.signIn);

router.route("/auth").post(auth, controller.auth);

router.route("/AddCredit").post(auth, controller.addCredit);

router.route("/").put(auth, controller.updateInfo);

router.route("/UpdateImage").put([auth, upload.single("image")], controller.updateImage);

module.exports = router;