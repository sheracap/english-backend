const { Lesson, Chapter} = require("../models/models");
const ApiError = require("../error/ApiError");

class LessonController {
    async create(req, res, next){
        try {
            const user = req.user;
            let { name, chapterId } = req.body;

            if (chapterId) {
                const chapter = await Chapter.findOne({ where: { id: chapterId } });

                if (!chapter) {
                    return next(ApiError.badRequest("Главы не существует"));
                }

                if (chapter.userId !== user.id) {
                    return next(ApiError.badRequest("У Вас нет необходимого права"));
                }
            }

            const lesson = await Lesson.create({
                userId: user.id,
                chapterId: chapterId ? chapterId : null,
                name,
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

    async getOne(req, res){
        const user = req.user;
        const { id } = req.params;

        const lesson = await Lesson.findOne({ where: { id, userId: user.id } });

        return res.json(lesson);
    }
}

module.exports = new LessonController();