const { Course, Section, Device, Chapter } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class CourseController {
    async create(req, res, next){
        try {
            const user = req.user;
            let { name, description, isPrivate } = req.body;
            const { img } = req.files;

            let filename;

            if (img) {
                filename = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, "..", "static", filename));
            }

            const course = await Course.create({
                userId: user.id,
                img: filename ? filename : null,
                name,
                description,
                isPrivate,
            });

            return res.json(course);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next){
        try {
            const user = req.user;
            const { id } = req.params;
            let { name, description, isPrivate } = req.body;

            const img = req.files?.img;

            let filename;

            // zashita ot chuzogo

            if (img) {
                filename = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, "..", "static", filename));
            }

            const data = {
                name,
                description,
                isPrivate,
                filename: filename ? filename : null
            };

            const course = await Course.update(
                data,
                { where: { id } },
            );

            return res.json(course);
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

            const courses = await Course.findAndCountAll({
                where: {
                    isPrivate: false,
                },
                limit,
                offset
            });

            return res.json(courses); // only for admin
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

            const courses = await Course.findAndCountAll({
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
        const { id } = req.params;

        const course = await Course.findOne({
            where: { id },
        })

        return res.json(course);
    }
}

module.exports = new CourseController();