module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        img_path: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_google_auth: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });

    return User;
}