import {  ProfileModel } from ".";
import { AppError } from "../../utils/app-error";
import { UserModel } from "../User";

export class ProfileService {

    /**
     * Gets the user profile
     * @param {string} username the username to look up
     */
    public getUserProfile = async (username: string) => {
        const user = await UserModel.findOne({where: {username}});
        if (user) {
            const profile = await user.getProfile({ attributes: { exclude: ["id", "userId","created_id","updated_at","deleted_at"] } });
            return (profile) ? profile : null;
       
        }
        // throw new AppError(`Profile with '${username}' not found.`, null, 404);
        return `User with ${username} not found`;
    }

    /**
     * Updates a user profile
     *
     * @param {Object} user the current user
     * @param {Object} profile the profile data to save
     * @returns {Object} the updated profile
     */
    public editProfile = async (user: any, data:any) => {
      const check = await ProfileModel.findOne({where:{user_id: user.id}})
      let username = user.username
      if(check){
        if(data.username == username){
          let profile = await ProfileModel.update(data, {where:{user_id:user.id}});
          if (!profile) {
            throw new AppError("Could not update user data");
          }
          // return await this.getUserProfile(user.username);
          profile = profile.toJSON
          return profile;
        }

      }

      // if(data.username != username){

        throw new AppError("username didn`t match")
      // }
        
    }
    

    /**
     * Saves uploaded profile photo
     *
     * @param {Object} user the current user
     * @param {Object} photo the uploaded photo with properties
     * @returns {Object} the updated profile data
     */
    public saveProfilePhoto = async (user: any, photo:any) => {
        const profileData = {
            profile_picture_url: photo.path,
        };
        const hasProfile: boolean = (await user.getProfile()) ? true : false;

        if (hasProfile) {
            return ProfileModel.update(profileData, {where: {user_id: user.id}}).then(() => {
                return this.getUserProfile(user.username);
               
            });
        } else {
            // const saved = await ProfileModel.create(profileData);
            // if (saved && user.setProfile(saved)) {
            //     return this.getUserProfile(user.username);
            // }
            console.log('Cannot upload picture')
        }
    }

   
      
    

}
