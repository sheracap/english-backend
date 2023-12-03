const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
    async create(req, res, next){
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let filename = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", filename));

            const device = await Device.create({
                name,
                price,
                brandId,
                typeId,
                img: filename
            });

            if (info) {
                info = JSON.parse(info);
                info.forEach((infoItem) => {
                    DeviceInfo.create({
                        title: infoItem.title,
                        description: infoItem.description,
                        deviceId: device.id
                    });
                })
            }

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next){
        try {
            let { brandId, typeId, limit, page } = req.query;

            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;

            let devices;

            const params = { limit, offset };

            const where = {};

            if (brandId) {
                where["brandId"] = brandId;
            }

            if (typeId) {
                where["typeId"] = typeId;
            }

            if (Object.keys(where).length) {
                params["where"] = where;
            }

            devices = await Device.findAndCountAll(params);

            return res.json(devices);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res){
        const { id } = req.params;

        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: "info" }]
        })

        return res.json(device);
    }
}

module.exports = new DeviceController();