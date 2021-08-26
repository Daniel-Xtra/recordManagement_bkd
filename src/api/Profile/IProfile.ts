import { IBaseInterface } from "../baseInterface";

export interface IProfile extends IBaseInterface {
    // type any is used to prevent error on validation level
    // profile data
    username:any;
    photo: any;
    title:any;
    local_govt:any;
    first_name:any;
    surname:any;
    other_name:any;
    religion:any;
    address:any;
    state:any;
    phone_number:any
    email:any;
    gender:any
    date_of_birth:any;
    marital_status:any
    nationality:any

}
