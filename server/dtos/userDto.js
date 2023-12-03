const CommonDto = require("./common");

module.exports = class UserDto {
    id;
    email;
    name;
    role;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.name = model.name;
        this.role = CommonDto.codeEntity(model.role.dataValues);
    }

}