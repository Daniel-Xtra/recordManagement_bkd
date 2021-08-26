import Sequelize,{Model}  from "sequelize";
import {DB} from '../../shared/database';
import { logger } from "../../utils/logger";
import withCursor from 'sequelize-cursor-pagination';
import { UserModel } from "../User";


export class NxtModel extends Model {}
NxtModel.init(
    {
        nktitle:{
            type: Sequelize.STRING(20),
            validate:{
                notEmpty:{
                    msg:'next_of_kin title can`t be empty'
                }
            }

        },

        nksurname:{
            type: Sequelize.STRING(255),
            validate:{
                notEmpty:{
                    msg:'next_of_kin surname can`t be empty'
                }
            }
        },
        nkfirst_name:{
            type: Sequelize.STRING(255),
            validate:{
                notEmpty:{
                    msg:'next_of_kin first_name can`t be empty'
                }
            }
        },

        nkphone_number:{
            type: Sequelize.STRING(20),
            validate:{
                isNumeric:{
                    msg:'Please confirm next_of_kin phonenumber contains valid characters'
                },
                notEmpty:{
                    msg: 'next_of_kin phone_number can`t be empty'
                }
            }
        },
        nkaddress:{
            type: Sequelize.STRING(255),
            validate:{
                notEmpty:{
                    msg:'next_of_kin addres can`t be empty'
                }
            }
        },
        relationship:{
            type: Sequelize.ENUM({values:['Brother','Sister','Aunt','Father','Uncle','Mother']}),
        }


    },{
    sequelize: DB,
    modelName: "next_of_kin",
    },
);

const options:any = {alter:true};
const paginationOptions: any = {
    methodName: "paginate",
    primaryKeyField: "id",
};

UserModel.hasOne(NxtModel),
NxtModel.belongsTo(UserModel),

NxtModel.sync(options).then(() => {
    logger.info("Next_of_kin table migrated")
});

withCursor(paginationOptions)(<any>NxtModel);