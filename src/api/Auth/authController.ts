import jwt from "jsonwebtoken";
import passport = require("passport");
import { BaseController } from "../baseController";
import { JWT_SECRET } from "../../config";
import { AppError } from "../../utils/app-error";
import { IUser, UserModel, UserService } from "../User";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { sendPasswordReset } from "../../utils/email";
import uuidv4 from "uuid/v4";
import { IUserModel } from "../../interfaces";
// import { sendSMS } from "../../utils/sms";

export class AuthController extends BaseController {
  private _userService = new UserService();

  public login = async (req, res, next) => {
    return new Promise((resolve, reject) => {
      return passport.authenticate("login", (err, user, info) => {
        if (!user || err) {
          return reject(new AppError(info.message));
        }
        return req.login(user, { session: false }, async (error) => {
          if (error) {
            return reject(new AppError(error));
          }
          const token = await this.generateToken(user);
          const refreshToken = await this.generateRefreshToken(user);


          const userData = await this._userService.getUser(req.body.username);
          resolve(this.sendResponse({ user: userData, token, refreshToken }));
        });
      })(req, res, next);
    });
  }
  
  public adminLogin = async (req, res, next) => {
    return new Promise((resolve, reject) => {
      return passport.authenticate("adminLogin", (err, user, info) => {
        if (!user || err) {
          return reject(new AppError(info.message));
        }
        return req.login(user, { session: false }, async (error) => {
          if (error) {
            return reject(new AppError(error));
          }
          const token = await this.generateToken(user);
          const refreshToken = await this.generateRefreshToken(user);

          const userData = await this._userService.getUser(req.body.username);
          resolve(this.sendResponse({ user: userData, token, refreshToken }));
        });
      })(req, res, next);
    });
  }
 
  public signup = async (user: IUser) => {
    const token = await this.generateToken(user);
    const newUser = await this._userService.getUser(user.username);
    const refreshToken = await this.generateRefreshToken(user);

    return this.sendResponse(
      { user: newUser, token, refreshToken},
      "User registration successful",
    );
  }
  /**
   * sendSMSRequest
   */
  public sendSMSRequest = async () => {
    // await sendSMS();
  }
  public refreshTokens = async (data) => {
    const user = <IUserModel>await UserModel.findOne({
      where: { refresh_token: data.refreshToken },
    });
    if (user) {
      const token = await this.generateToken(user);
      const refreshToken = await this.generateRefreshToken(user);
      return this.sendResponse({ token, refreshToken });
    }
    throw new AppError("Invalid refresh token sent", "refreshToken", 404);
  }

  public refreshTokensById = async (id) => {
    const user = <IUserModel>await UserModel.findOne({
      where: { id },
    });
    if (user) {
      const token = await this.generateToken(user);
      const refreshToken = await this.generateRefreshToken(user);
      return this.sendResponse({ token, refreshToken, username: user.username });
    }
    throw new AppError("Invalid user ID", null, 404);
  }


  /**
   * logout
   */
  public logout = async (user: any) => {
    const updated = await UserModel.update(
      { player_id: null },
      { where: { id: user.id } },
    );
    if (updated) {
      return this.sendResponse("Logged out successfully.");
    }
  }

  /**
   * requestPasswordReset
   */
  public requestPasswordReset = async (email: string) => {
    const user = await UserModel.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError("No user exists with that email address.");
    }

    const password_reset_code = this.generatePasswordResetCode();
    const updated = await UserModel.update(
      { password_reset_code },
      {
        where: { id: user.id },
      },
    );
    if (!updated) {
      throw new AppError("An error occurred");
    }
    let sent = await sendPasswordReset(password_reset_code, user);
    if (!sent) {
      throw new AppError("An error occurred");
    }

    return this.sendResponse(sent);
  }

  /**
   * verifyResetCode
   */
  public verifyResetCode = async (code: string) => {
    const user = await UserModel.findOne({
      where: { password_reset_code: code },
    });
    if (!user) {
      throw new AppError("Invalid password reset code");
    }
    return this.sendResponse("Password reset code is valid");
  }

  /**
   * resetPassword
   */
  public resetPassword = async (code: string, password: string) => {
    if (!code || !password) {
      throw new AppError(
        "Please provide both your password reset code and new password",
      );
    }

    const user = await UserModel.findOne({
      where: { password_reset_code: code },
    });
    if (!user) {
      throw new AppError("User not found");
    }

    const hash = bcryptjs.hashSync(password, 10);
    const updated = await UserModel.update(
      { password: hash, password_reset_code: null, pass_updated: 1 },
      {
        where: { id: user.id },
      },
    );
    if (!updated) {
      throw new AppError("Could not update password");
    }

    return this.sendResponse("Password reset successfully");
  }

  /**
   * generates JWT from user details
   *
   * @private
   * @param {IUser} user authenticated user
   * @returns {string} signed JWT
   * @memberof AuthController
   */
  private async generateToken(user: IUser) {
    const body = { id: user.id, username: user.username };
    const token = jwt.sign({ user: body }, JWT_SECRET, { expiresIn: "180d" });
    const _user = UserModel.update(
      { auth_key: token },
      { where: { username: user.username } },
    );
    if (_user) {
      return token;
    }
  }

  // private async generateLoginId  (user:any)  {
  //     return crypto.randomBytes(3).toString("hex")

  // }
  private generatePasswordResetCode = () => {
    return crypto.randomBytes(3).toString("hex");
  }

  private async generateRefreshToken(user: any) {
    const refreshToken = uuidv4();
    const _user = await UserModel.update(
      { refresh_token: refreshToken },
      { where: { id: user.id } },
    );
    if (_user) {
      return refreshToken;
    }
  }
}
