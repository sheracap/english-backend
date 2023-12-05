const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const roleRouter = require("./roleRouter");
const deviceRouter = require("./deviceRouter");
const courseRouter = require("./courseRouter");
const chapterRouter = require("./chapterRouter");
const lessonRouter = require("./lessonRouter");
const sectionRouter = require("./sectionRouter");
const exerciseRouter = require("./exerciseRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/role", roleRouter);
router.use("/device", deviceRouter);
router.use("/course", courseRouter);
router.use("/chapter", chapterRouter);
router.use("/lesson", lessonRouter);
router.use("/section", sectionRouter);
router.use("/exercise", exerciseRouter);

module.exports = router;