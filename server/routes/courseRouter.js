const Router = require("express");
const router = new Router();
const courseController = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, courseController.create);
router.put("/:id", authMiddleware, courseController.update);
router.get("/", authMiddleware, courseController.getAll);
router.get("/current", authMiddleware, courseController.getCurrent);
router.get("/:id", authMiddleware, courseController.getOne);

module.exports = router;