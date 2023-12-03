const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const { User, Basket, DeviceInfo, Role } = require("../models/models");
const UserDto = require("../dtos/userDto");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const { name, email, password, roleId } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest("Некорректный email или пароль"));
            }

            const candidate = await User.findOne({ where: { email } });

            if (candidate) {
                return next(ApiError.badRequest("Пользователь с таким email существует"));
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await User.create({
                name,
                email,
                roleId,
                password: hashPassword
            });

            const token = generateJwt(user.id, user.email, user.role);

            return res.json({ token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return next(ApiError.badRequest("Пользователь не найден"));
            }

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) {
                return next(ApiError.badRequest("Неверный пароль"));
            }

            const token = generateJwt(user.id, user.email, user.role);

            return res.json({ token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async check(req, res, next) {
        try {
            return res.json({ test: "working" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async current(req, res, next) {
        try {
            const currentUser = await User.findOne({
                where: { id: req.user.id },
                include: [{ model: Role }]
            });

            const userDto = new UserDto(currentUser);

            //const userDto = currentUser;

            return res.json(userDto);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserController();