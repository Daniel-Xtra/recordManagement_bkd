import bcryptjs from "bcryptjs";
import { UserModel } from "./userModel";
import { AppError } from "../../utils/app-error";
import { ProfileModel } from "../Profile";
import { USER_EXCLUDES } from '../../utils/helpers';
import { NxtModel } from "../Next_of_kin/nxtModel";
import { IUser } from ".";


export class UserService {
    
    public getAllUser = async ( per_page: number) => {  
        const limit = 2
        const offset = (per_page - 1) * limit
        // let users = await (<any>UserModel).paginate({
        //     where:{
        //         membership_type: "user"
        //     },
        //     limit,
        //     offset,
        //     desc: true,
          
        // })

        // if (users) {
        //     // responsible for count total orders
        //     const totalUsers = await UserModel.count();
        //     return {
        //       results: users.results,
        //       cursor: users.cursors,
        //       totalUsers,
        //     };
        //   }
        //   throw new AppError("No user found", null, 404);




        let users =  await UserModel.findAll({
            where:{
                membership_type : "user"
              
            },
            limit,
            offset,
            attributes:{
            exclude:["password","email_verification_code","auth_key","refresh_token"]
        }})
        if (users && users.length > 0) {
            users = await Promise.all(users.map(async (user) => {
                user = user.toJSON();
                return user;
            }));

            return users;
        }
          throw new AppError("No User found", null, 404);
    }
    

    /**
     * Fetches and returns a single user resource
     * @public
     * @param {string} username - the username to lookup
     * @returns {(Object|null)} user - the user resource | null
     */
   
    public getUser = async (username: string) => {

        let user = await UserModel.findOne({
            where: { username },
            attributes: {
                exclude: [
                    "password", "email_verification_code", "auth_key",
                ],
            },
            include: [
                {
                    model: ProfileModel,
                    attributes: {
                        exclude: [
                            "updated_at",
                            "deleted_at",
                            "userId",
                        ],
                    },
                },
            ],
        });

        if (user) {
            user = user.toJSON();
            return user;
        }
        throw new AppError(`User '${username}' not found.`, null, 404);
    }


    /**
     * Updates a user resource
     * @public
     * @param {Object} user the current user
     * @param {Object} data the data to be updated
     * @returns {(Object|null)} the updated user resource
     */

    public updateUse = async (user: IUser, data: IUser) => {
        let username = user.username;

        if(data.username != username){
            throw new AppError("username didn`t match")
        }
    
        if (data.password) {
          // bcrypt the password
          data.password = bcryptjs.hashSync(data.password, 10);
        }
        if (data.username == username) {
          // update user name
          const updated = await UserModel.update(data, { where: { username } });
         
          const profile = await ProfileModel.update(data, {where:{user_id: user.id}});
          const nxtKin = await NxtModel.update(data, {where:{user_id: user.id}})
          if (!updated || !profile) {
            throw new AppError("Could not update user data");
        }
     
        else if(!nxtKin){
            throw new AppError("Could not update next_of_kin");
        }
          username = data.username;
          return await this.getUser(username);
        }
       
      }

    public updateUser = async(user: IUser, data:IUser) => {
        let username = data.username
        const verify = await UserModel.findOne({where:{username}});
        if(verify){
            if(data.username != verify.username){
                throw new AppError("Username doesn`t match")
            }
            if (data.username == username) {
                // update user name
                const updated = await UserModel.update(data, { where: { username } });
               
                const profile = await ProfileModel.update(data, {where:{user_id: verify.id}});           
                if (!updated || !profile) {
                  throw new AppError("Could not update user data");
                }
                return await this.getUser(username);
            }
        }
        throw new AppError(`user with '${username}' not found.`,null, 404)
    }  
    /**
     * getUserStatus
     */
    public getUserStatus = async (username: string) => {
        let user = await UserModel.findOne({
            where: { username },
            attributes: {
                exclude: USER_EXCLUDES,
            },
        });

        if (user) {
            user = user.toJSON();
            user.isOnline = (user.socket_id != null) ? true : false;
            return user;
        }

        throw new AppError(`User ${username} not found`, null, 404);
    }



    
}
