const Router = require("express");
const router = new Router();
const exerciseController = require("../controllers/exerciseController");

router.post("/", exerciseController.create);
router.get("/:sectionId", exerciseController.getBySection);

module.exports = router;