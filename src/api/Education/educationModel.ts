import  Sequelize,{Model} from "sequelize";
import{ DB }from '../../shared/database';
import { logger } from "../../utils/logger";
import { UserModel } from "../User";

export class EducationModel extends Model{}
  EducationModel.init({
    title:{
        type:Sequelize.STRING(20)
    },
    school:{
        type: Sequelize.STRING(50)
    },
    department:{
        type: Sequelize.STRING(50)
    },
    category:{
        type:Sequelize.STRING(50)
    },
    position:{
        type: Sequelize.STRING(50)
    },

  },{
      sequelize:DB,
      modelName:"education"
  },
  )

  const options: any = {
    alter: true,
};

UserModel.hasOne(EducationModel);
EducationModel.belongsTo(UserModel);

// force: true will drop the table if it already exists
EducationModel.sync(options).then(() => {
    logger.info("Education table migrated");
    // Table created
});
