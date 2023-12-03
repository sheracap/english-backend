const { Section, Exercise } = require("../models/models");
const ApiError = require("../error/ApiError");

class SectionController {
    async create(req, res, next){
        try {
            let { name, lessonId } = req.body;

            const section = await Section.create({ name, lessonId });

            return res.json(section.id);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next){
        try {
            let { limit, page } = req.query;

            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;

            const params = { limit, offset };

            const sections = await Section.findAndCountAll(params);

            return res.json(sections);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next){
        try {
            const { id } = req.params;

            const section = await Section.findOne({
                where: { id },
                include: [{ model: Exercise }]
            })

            return res.json(section);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new SectionController();