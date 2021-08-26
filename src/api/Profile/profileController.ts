
import { BaseController } from "../baseController";

import { ProfileService } from "./profileService";

/**
 * Post controller
 *
 * @export
 * @class ProfileController
 */
export class ProfileController extends BaseController {
    private _profileService = new ProfileService();

    public index = () => {
       return this.sendResponse("profile");
    }

    public getProfile = async (username: string) => {
        const user = await this._profileService.getUserProfile(username);
        return this.sendResponse(user);
    }

    /**
     * editProfile
     */
    public editProfile = async (user:any, data: any) => {
        const updated = await this._profileService.editProfile(user, data);
        return this.sendResponse(updated);
    }

    /**
     * Calls sevice to save uploaded profile photo
     *
     * @param {Object} user the current user
     * @param {Object} photo the uploaded photo with properties
     */
    public saveProfilePhoto = async (user: any, photo: any) => {
        const profile = await this._profileService.saveProfilePhoto(user, photo);
        return this.sendResponse(profile);
    }

}
