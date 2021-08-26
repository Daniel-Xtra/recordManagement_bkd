import bcryptjs from "bcryptjs";
import crypto from "crypto";
import generateSha1Hash from "sha1";
import _ from "lodash";
import { ExtractJwt, Strategy as JWTstrategy } from "passport-jwt";
import { Strategy as localStrategy } from "passport-local";
import {  NxtModel, UserModel } from "../api/User";
import { EducationModel } from "../api/Education";
import { JWT_SECRET } from "../config/index";
import { AppError } from "../utils/app-error";
import { ProfileModel } from "../api/Profile";
import { IUserModel } from "../interfaces";



export const signupStrategy = new localStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, username, password, done) => {
    try {
        const body: any = _.pick(req.body,
            ["title","first_name","other_name","surname","nationality","date_of_birth","gender","state","local_govt",
            "marital_status","blood_group","genotype","address","religion","username", "email", "phone_number",
            "nktitle","nksurname","nkfirst_name","nkphone_number","nkaddress","relationship","school","department",
            "category","position","membership_type"]);
   
        // TODO: check for phone number and email address
        const exUser = await UserModel.findOne({
            where: { username },
        });

        const exUserByEmail = await UserModel.findOne({
            where: {
                email: body.email,
            },
        });

        const exUserByPhone = await UserModel.findOne({
            where: {
                phone_number: body.phone_number,
            },
        });

        if (exUser) {
            return done(
                new AppError(`An account with that username already exists.`),
            );
        } else if (exUserByEmail) {
            return done(
                new AppError(`An account with that email already exists`),
            );
        } else if (exUserByPhone) {
            return done(
                new AppError(`Sorry, that phone number is already in use.`),
            );
        }

        const passwordHash = bcryptjs.hashSync(password, 10);
        const emailVerificationCode = generateEmailVerificationCode();

        const user = await UserModel.create(
            {
                username,
                password: passwordHash,
                email_verification_code: emailVerificationCode,
               
                pass_updated: 1,
                membership_type : "user",
                ...body,
            });
        const profile = await ProfileModel.create(req.body);
        const next_of_kin = await NxtModel.create(req.body);
        const education = await EducationModel.create(req.body);
        await user.setProfile(profile);
        await user.setNext_of_kin(next_of_kin);
        await user.setEducation(education);
        // Send the user information to the next middleware
        return done(null, user);
    } catch (error) {
        done(Error(error));
    }
});

export const adminSignupStrategy = new localStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, username, password, done) => {
    try {
        const body: any = _.pick(req.body,
            ["username", "email", "phone_number","title","first_name","surname","other_name","address", "gender"]);
        // TODO: check for phone number and email address
        const exUser = await UserModel.findOne({
            where: { username },
        });

        const exUserByEmail = await UserModel.findOne({
            where: {
                email: body.email,
            },
        });

        const exUserByPhone = await UserModel.findOne({
            where: {
                phone_number: body.phone_number,
            },
        });

        if (exUser) {
            return done(
                new AppError(`An account with that username already exists.`),
            );
        } else if (exUserByEmail) {
            return done(
                new AppError(`An account with that email already exists`),
            );
        } else if (exUserByPhone) {
            return done(
                new AppError(`Sorry, that phone number is already in use.`),
            );
        }

        const passwordHash = bcryptjs.hashSync(password, 10);
        const emailVerificationCode = generateEmailVerificationCode();
        const user = await UserModel.create(
            {
                username,
                password: passwordHash,
                email_verification_code: emailVerificationCode,
                pass_updated: 1,
                membership_type : "admin",
                ...body,
            });
        const profile = await ProfileModel.create(req.body);

        const nxt = await NxtModel.create(req.body);
        await user.setProfile(profile);
        await user.setNxt(nxt)

        // Send the user information to the next middleware
        return done(null, user);
    } catch (error) {
        done(Error(error));
    }
});

export const loginStrategy = new localStrategy({
    usernameField: "username",
    passwordField: "password",

}, async (  username, password, done) => {
    try {
        let loginFailed = false;
        const user = <IUserModel> await UserModel.findOne({ where: { username } });
       
        if (user) {
           if(user.membership_type == "user"){
            let validate: boolean;
            const pass_updated = user.pass_updated;

            if (pass_updated == 0) {
                if (generateSha1Hash(password) != user.password) {
                    validate = false;
                }else{
                    const passwordHash = bcryptjs.hashSync(password, 10);
                    await UserModel.update({ password: passwordHash, pass_updated: 1 }, { where: { username } });
                    validate = await bcryptjs.compare(password, passwordHash);

                }
                
            } else {
                validate = await bcryptjs.compare(password, user.password);

            }

            if (!validate ) {
                loginFailed = true;
            }
           }else{
            return done(null, false, { message: "You are not authorized to login." });
           }
        } else {
            loginFailed = true;
        }
        if (loginFailed) {
            return done(null, false, { message: "Incorrect username or password." });
        }
        // Send the user information to the next middleware
        return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
        return done(error);
    }
});

export const adminLoginStrategy = new localStrategy({
    usernameField: "username",
    passwordField: "password",
}, async (username, password, done) => {
    try {
        let loginFailed = false;
        const user = <IUserModel> await UserModel.findOne({ where: { username } });
        if (user) {
            if (user.membership_type == "admin") {
                let validate: boolean;
                const pass_updated = user.pass_updated;
                if (pass_updated == 0) {
                    if (generateSha1Hash(password) != user.password) {
                        validate = false;
                    } else {
                        const passwordHash = bcryptjs.hashSync(password, 10);
                        await UserModel.update({ password: passwordHash, pass_updated: 1 }, { where: { username } });
                        validate = await bcryptjs.compare(password, passwordHash);
                    }
                } else {
                    validate = await bcryptjs.compare(password, user.password);
                }
                if (!validate) {
                    loginFailed = true;
                }
            } else {
                return done(null, false, { message: "You are not authorized to login." });
            }
        } else {
            loginFailed = true;
        }
        if (loginFailed) {
            return done(null, false, { message: "Incorrect username or password." });
        }
        // Send the user information to the next middleware
        return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
        return done(error);
    }
});

export const jwtStrategy = new JWTstrategy({
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
    try {
        // Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
});



/**
 * generates unique code for email verification
 * @returns {string} hexadecimal string
 */
function generateEmailVerificationCode() {
    const str = crypto.randomBytes(20).toString("hex");
    return str;
}
