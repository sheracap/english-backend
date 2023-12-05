const Router = require("express");
const router = new Router();
const lessonController = require("../controllers/lessonController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, lessonController.create);
router.get("/:chapterId", authMiddleware, lessonController.getByChapter);
router.get("/current", authMiddleware, lessonController.getCurrent);
router.get("/:id", lessonController.getOne);

module.exports = router;