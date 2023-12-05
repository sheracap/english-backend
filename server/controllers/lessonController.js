const { Lesson, Chapter } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class LessonController {
    async create(req, res, next){
        try {
            const user = req.user;
            let { name, chapterId } = req.body;
            const { img } = req.files;

            if (chapterId) {
                const chapter = await Chapter.findOne({ where: { id: chapterId } });

                if (!chapter) {
                    return next(ApiError.badRequest("Главы не существует"));
                }

                if (chapter.userId !== user.id) {
                    return next(ApiError.badRequest("У Вас нет необходимого права"));
                }
            }

            let filename;

            if (img) {
                filename = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, "..", "static", filename));
            }

            const lesson = await Lesson.create({
                userId: user.id,
                chapterId: chapterId ? chapterId : null,
                name,
                img: filename ? filename : null,
            });

            return res.json(lesson);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getByChapter(req, res, next){
        try {
            const user = req.user;
            let { chapterId } = req.params;

            const lessons = await Lesson.findAll({
                where: {
                    userId: user.id,
                    chapterId,
                },
            });

            return res.json(lessons);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getCurrent(req, res, next){
        try {
            const user = req.user;
            let { limit, page } = req.query;

            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;

            const courses = await Lesson.findAndCountAll({
                where: { userId: user.id },
                limit,
                offset
            });

            return res.json(courses);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res){
        const user = req.user;
        const { id } = req.params;

        // zashita ot chuzogo

        const lesson = await Lesson.findOne({ where: { id, userId: user.id } });

        return res.json(lesson);
    }
}

module.exports = new LessonController();