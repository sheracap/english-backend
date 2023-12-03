const { Brand } = require("../models/models");

class CommonDto {
    codeEntity(model){
        return {
            code: model.code,
            name: model.name
        };
    }
}

module.exports = new CommonDto();