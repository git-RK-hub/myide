const router = require("express").Router();
const controller = require("../controllers/compiler");
router.post("/", controller.compile);

module.exports = router;
