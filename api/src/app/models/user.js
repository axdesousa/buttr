const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        "User",
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            tableName: "users",
            hooks: {
                beforeSave: async user => {
                    if (user.password) {
                        user.password = await bcrypt.hash(user.password, 8)
                    }
                }
            }
        }
    )
    user.associate = function () {
        // associations can be defined here
    }
    user.prototype.checkPassword = async function (password) {
        const compare = await bcrypt.compare(password.toString(), this.password)
        return compare
    }
    user.prototype.generateToken = function () {
        return jwt.sign({ id: this.id }, process.env.APP_SECRET)
    }
    return user
}
