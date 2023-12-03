const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

// npx sequelize-cli migration:create --name User-add-name-column     migration create
// npx sequelize-cli db:migrate

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
});

const Role = sequelize.define("role", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING }
});

const Basket = sequelize.define("basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const BasketDevice = sequelize.define("basket_device", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const Device = sequelize.define("device", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false  },
    price: { type: DataTypes.INTEGER, allowNull: false  },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Brand = sequelize.define("brand", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Rating = sequelize.define("rating", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false }
});

const DeviceInfo = sequelize.define("device_info", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
});

const TypeBrand = sequelize.define("type_brand", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const Course = sequelize.define("course", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    isPrivate: { type: DataTypes.BOOLEAN, defaultValue: true },
    img: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING(500) }
});

const Chapter = sequelize.define("chapter", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
    rowPosition: { type: DataTypes.INTEGER },
});

const Lesson = sequelize.define("lesson", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
});

const Section = sequelize.define("section", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING }
});

const Exercise = sequelize.define("exercise", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    template: { type: DataTypes.STRING },
    value: { type: DataTypes.STRING },
    answer: { type: DataTypes.STRING },
    wrongAnswers: { type: DataTypes.ARRAY(DataTypes.STRING) } // replace to allAnswers - put inside correct answer too
});

User.hasOne(Basket);
Basket.belongsTo(User);

Role.hasMany(User);
User.belongsTo(Role);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

User.hasMany(Course);
Course.belongsTo(User);

User.hasMany(Lesson);
Lesson.belongsTo(User);

Course.hasMany(Chapter);
Chapter.belongsTo(Course);

Chapter.hasMany(Lesson);
Lesson.belongsTo(Chapter);

User.hasMany(Chapter);
Chapter.belongsTo(User);

Lesson.hasMany(Section);
Section.belongsTo(Lesson);

Section.hasMany(Exercise);
Exercise.belongsTo(Section);

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Role,
    Rating,
    TypeBrand,
    DeviceInfo,
    Course,
    Chapter,
    Lesson,
    Section,
    Exercise
}