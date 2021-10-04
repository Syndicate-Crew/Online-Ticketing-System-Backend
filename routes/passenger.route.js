const controller = require("../controllers/passenger.controller");
const router = require("express").Router();
const auth = require("../middleware/passenger.auth");
const upload = require("../middleware/image.middleware").upload;

router.route("/").get(controller.getAll);

router.route("/:id").get(controller.getById);

router.route("/").post(upload.single("image"),controller.create);

router.route("/SignIn").post(controller.signIn);

router.route("/auth").post(auth, controller.auth);

router.route("/AddCredit").post(auth, controller.addCredit);

router.route("/").put(auth, controller.updateInfo);

router.route("/UpdateImage").put([auth, upload.single("image")], controller.updateImage);

module.exports = router;