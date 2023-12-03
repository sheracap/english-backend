const { Exercise } = require("../models/models");
const ApiError = require("../error/ApiError");

class exerciseController {
    async create(req, res, next){
        try {
            let { sectionId, template, value, answer, wrongAnswers } = req.body;

            const exercise = await Exercise.create({
                sectionId,
                template,
                value,
                answer,
                wrongAnswers
            });

            return res.json(exercise.id);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getBySection(req, res){
        const { sectionId } = req.params;

        const exercises = await Exercise.findAll({
            where: { sectionId }
        })

        return res.json(exercises);
    }
}

module.exports = new exerciseController();