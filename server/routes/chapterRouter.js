const Router = require("express");
const router = new Router();
const chapterController = require("../controllers/chapterController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, chapterController.create);
router.get("/by-course/:courseId", authMiddleware, chapterController.getByCourse);
router.put("/by-course/position/:courseId", authMiddleware, chapterController.updateChaptersPosition);
router.get("/:id", authMiddleware, chapterController.getOne);

module.exports = router;