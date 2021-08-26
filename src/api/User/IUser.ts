import { IBaseInterface } from "../baseInterface";

export interface IUser extends IBaseInterface {
    // type any is used to prevent error on validation level
    title:any,
    username: any;
    surname:any;
    first_name: any;
    other_name: any;
    email: any;
    password: any;
    phone_number: any;
    gender: any;
    membership_type: any;
    marital_status:any;
    date_of_birth:any;
    blood_group:any;
    genotype:any;
    religion:any;
    email_verification_code: any;
    local_govt: any;
    nationality:any;
    department:any;
    address:any;
    state: any;
    category:any;
    position:any;
    school:any;
    nktitle:any;
    nkaddress:any;
    nksurname:any;
    nkfirst_name:any;
    nkphone_number:any;
    relationship:any;

}
