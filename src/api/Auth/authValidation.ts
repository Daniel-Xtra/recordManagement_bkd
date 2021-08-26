import Joi from "joi";

export const LoginValidationSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const SignupValidationSchema = Joi.object().keys({
    surname: Joi.string().alphanum().max(30).allow("").optional(),
    first_name: Joi.string().alphanum().max(30).allow("").optional(),
    other_name: Joi.string().alphanum().max(30).allow("").optional(),
    username: Joi.string().regex(/^[a-zA-Z0-9._-]{3,16}$/i).required(),
    password: Joi.string().min(6).max(32).required(),
    email: Joi.string().email().required(),
    phone_number: Joi.number().required(),
    gender: Joi.string().required(),
    membership_type: Joi.string(),
    date_of_birth: Joi.date(),
    email_verification_code: Joi.string(),
    local_govt: Joi.string(),
    nationality: Joi.string(),
    title: Joi.string().required(),
    marital_status:Joi.string(),
    department: Joi.string(),
    relationship: Joi.string(),
    address: Joi.string().required(),
    religion: Joi.string(),
    state: Joi.string(),
    position: Joi.string(),
    category: Joi.string(),
    school: Joi.string(),
    nktitle: Joi.string(),
    nkaddress: Joi.string(),
    nksurname: Joi.string(),
    nkphone_number: Joi.number(),
    nkfirst_name: Joi.string(),
    blood_group: Joi.string(),
    genotype:  Joi.string(),
    photo:Joi.any()



});

export const RefreshTokensValidationSchema = Joi.object().keys({
    refreshToken: Joi.string().uuid().required(),
});
