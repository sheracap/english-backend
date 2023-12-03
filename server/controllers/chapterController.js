const { Chapter, Course, Lesson } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class ChapterController {
    async create(req, res, next){
        try {
            const user = req.user;
            let { name } = req.body;
            const { img } = req.files;
            const courseId = req.body.courseId;

            const course = await Course.findOne({ where: { id: courseId } });

            if (!course) {
                return next(ApiError.badRequest("Курса не существует"));
            }

            if (course.userId !== user.id) {
                return next(ApiError.badRequest("У Вас нет необходимого права"));
            }

            let filename;

            if (img) {
                filename = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, "..", "static", filename));
            }

            const chapterRows = await Chapter.count({
                where: { courseId }
            });

            const chapter = await Chapter.create({
                userId: user.id,
                courseId,
                name,
                img: filename ? filename : null,
                rowPosition: chapterRows + 1,
            });

            return res.json(chapter);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getByCourse(req, res, next){
        try {
            const user = req.user;
            const { courseId } = req.params;

            const chapters = await Chapter.findAll({
                where: {
                    userId: user.id,
                    courseId,
                },
                include: [Lesson],
                order: [
                    ["rowPosition", "ASC"]
                ]
            });

            return res.json(chapters);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateChaptersPosition(req, res, next){
        try {
            const user = req.user;
            const data = req.body;
            const { courseId } = req.params;

            const course = await Course.findOne({ where: { id: courseId } });

            if (!course) {
                return next(ApiError.badRequest("Курса не существует"));
            }

            if (course.userId !== user.id) {
                return next(ApiError.badRequest("У Вас нет необходимого права"));
            }

            const chapters = await Chapter.findAll({
                where: { id: Object.keys(data), courseId }
            });

            for (let i = 0; i < chapters.length; i++) {
                const item = chapters[i];
                await item.update({ rowPosition: Number(data[item.id]) });
            }

            return res.json(courseId);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res){
        const { id } = req.params;

        const chapter = await Chapter.findOne({ where: { id } });


        return res.json(chapter);
    }
}

module.exports = new ChapterController();