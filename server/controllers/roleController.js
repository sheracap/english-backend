const { Role } = require("../models/models");
const ApiError = require("../error/ApiError");

class RoleController {
    async create(req, res){
        const { name, code } = req.body;
        const role = await Role.create({ name, code });
        return res.json(role);
    }

    async getAll(req, res){
        const roles = await Role.findAll();
        return res.json(roles);
    }
}

module.exports = new RoleController();