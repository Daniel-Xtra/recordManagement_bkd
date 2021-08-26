import Joi from "joi";
import { IProfile } from "./IProfile";

export const ProfileValidationSchema = Joi.object().keys(<IProfile>{
    photo: Joi.any(),
    title: Joi.string(),
    username: Joi.string().regex(/^[a-zA-Z0-9._-]{3,16}$/i),
    surname: Joi.string().alphanum().max(30).allow("").optional(),
    first_name: Joi.string().alphanum().max(30).allow("").optional(),
    other_name: Joi.string().alphanum().max(30).allow("").optional(),  
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(6).max(32),
    phone_number: Joi.string().regex(/^[0-9+]{3,16}$/),   
    gender: Joi.string().allow(""),
    membership_type: Joi.string().allow(""),
    marital_status: Joi.string(),
    date_of_birth: Joi.date(),
    blood_group: Joi.string().allow(""),
    genotype: Joi.string().allow(""),
    religion: Joi.string().allow(""),
    local_govt: Joi.string().allow(""),
    nationality: Joi.string().allow(""),
    address: Joi.string().allow(""),
    state: Joi.string().allow(""),
    // position: Joi.string().allow(""),
    // category: Joi.string().allow(""),
    // school: Joi.string().allow(""),
    // department: Joi.string().allow(""),
});
