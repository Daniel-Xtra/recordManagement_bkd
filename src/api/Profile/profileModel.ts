import Sequelize, { Model } from "sequelize";
import { DB } from "../../shared/database";
import { logger } from "../../utils/logger";
import { UserModel } from "../User";

export class ProfileModel extends Model { }
ProfileModel.init(
    {
        username:{
            type: Sequelize.STRING(50)
        },
        title:{
            type: Sequelize.STRING(50)
        },
        surname:{
            type: Sequelize.STRING(50)
        },
        first_name: {
            type: Sequelize.STRING(50),            
        },
        other_name: {
            type: Sequelize.STRING(50),
        },
        email: {
            type: Sequelize.STRING(50),
        },
        phone_number: {
            type: Sequelize.STRING(20),
        },
        gender: {
            type: Sequelize.STRING(20),
        },
        date_of_birth: {
            type: Sequelize.DATEONLY(),
        },
        religion:{
            type: Sequelize.STRING(20)
        },
        profile_picture_url: {
            type: Sequelize.STRING(120),
        },
        marital_status:{
            type: Sequelize.STRING(20)
        },
        nationality:{
            type: Sequelize.STRING(50)
        },
        state:{
            type: Sequelize.STRING(50)
        },
        local_govt:{
            type: Sequelize.STRING(50)
        },
        address:{
            type: Sequelize.STRING(150),
        },
        blood_group:{
            type: Sequelize.ENUM({values:["O+","O-"]})
        },

        genotype:{
            type: Sequelize.ENUM({values:["AA","AS","SS"]})
        }
        // nktitle:{
        //     type:Sequelize.STRING(20)
        // },
        // nksurname: {
        //     type: Sequelize.STRING(10),
        // },
        // nkfirst_name: {
        //     type: Sequelize.STRING(10),   
        // },
        // nkaddress:{
        //     type: Sequelize.STRING(150),
        // },
        // nkphone_number:{
        //     type: Sequelize.STRING(20)
        // },
        // relationship:{
        //     type: Sequelize.STRING(20)
        // },
    },
    {
        sequelize: DB,
        modelName: "profiles",
    },
);

const options: any = {
    alter: true,
};

UserModel.hasOne(ProfileModel);
ProfileModel.belongsTo(UserModel);

// force: true will drop the table if it already exists
ProfileModel.sync(options).then(() => {
    logger.info("Profiles table migrated");
    // Table created
});
