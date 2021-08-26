import Sequelize, { Model } from "sequelize";
import { DB } from "../../shared/database";
import { logger } from "../../utils/logger";
import withCursor from "sequelize-cursor-pagination";

export class UserModel extends Model { }
UserModel.init(
    {
      
        username: {
            type: Sequelize.STRING(50),
            unique: {
                name: "username",
                msg: "An account already exists with this username",
            },
            validate: {
                is: /^[a-zA-Z0-9._-]{3,16}$/i,
                notEmpty: {
                    msg: "Username cannot be empty",
                },
            },
        },
        title:{
            type: Sequelize.STRING(20)
        },
        surname: {
            type: Sequelize.STRING(10),
            validate: {
                min: 2,
            },
        },
        first_name: {
            type: Sequelize.STRING(30),
            validate: {
                min: 2,
            },
        },
        other_name: {
            type: Sequelize.STRING(50),
            validate: {
                min: 2,
            },
        },
        email: {
            type: Sequelize.STRING(50),
            unique: {
                name: "email",
                msg: "An account already exists with this email address.",
            },
            validate: {
                isEmail: { msg: "Please check this is a valid email" },
                notEmpty: { msg: "email can't be empty" },
            },
        },
        phone_number: {
            type: Sequelize.STRING(20),
            validate: {
                isNumeric: {
                    msg: "Please confirm phonenumber contains valid characters",
                },
            },
        },
        password: {
            type: Sequelize.STRING(191),
            validate: {
                notEmpty: { msg: "password can't be empty" },
            },
        },
        gender: {
            type: Sequelize.STRING(20),
        },
       
        membership_type: {
            type: Sequelize.ENUM({ values: ["user", "admin"] }),
            // defaultValue: "user",
        },
        address:{
            type: Sequelize.STRING(150),
        },
        
        refresh_token: {
            type: Sequelize.STRING(150),
            unique: {
                name: "refresh_token",
                msg: "Duplicate refresh token",
            },
            allowNull: true,
        },

        email_verification_code: {
            type: Sequelize.STRING(150),
        },
        password_reset_code: {
            type: Sequelize.STRING(6),
            unique: {
                name: "password_reset_code",
                msg: "Duplicate password reset code",
            },
        },
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },

        auth_key: {
            type: Sequelize.TEXT,
        },
        player_id: {
            type: Sequelize.STRING(50),
        },
        pass_updated: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        username_updated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    }, {
    sequelize: DB,
    modelName: "users",
},
);

const options: any = { alter: true };

const paginationOptions: any = {
    methodName: "paginate",
    primaryKeyField: "id",
};
// force: true will drop the table if it already exists
UserModel.sync(options).then(() => {
    logger.info("Users table migrated");
    // Table created
});
withCursor(paginationOptions)(<any>UserModel);
