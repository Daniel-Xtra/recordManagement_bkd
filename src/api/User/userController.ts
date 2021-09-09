// import { IUser } from ".";
import { BaseController } from "../baseController";
import { IUser } from "./IUser";
import { UserService } from "./userService";

/**
 * User controller
 *
 * @export
 * @class UserController
 */
export class UserController extends BaseController {
    private _userService = new UserService();

    public index = () => {
        return this.sendResponse("hello!");
    }
     /**
     * getAllUsers
     */
    public getAllUsers = async(per_page:number) => {
        const users = await this._userService.getAllUser(per_page)
        return this.sendResponse(users)
    }

 
     /**
     * getSingleUser
     */
    public getUser = async (username: string) => {
        const user = await this._userService.getUser(username);
        return this.sendResponse(user);
    }
 
    /**
     * updates user data
     */
    public updateUser = async (user: IUser, data:IUser) => {
        const updated = await this._userService.updateUser(user, data);
        return this.sendResponse(updated);
    }

    /**
     * getUserStatus
     */
    public getUserStatus = async (username: string) => {
        const user = await this._userService.getUserStatus(username);
        return this.sendResponse(user);
    }

}
