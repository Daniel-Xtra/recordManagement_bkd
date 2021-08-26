import { IBaseInterface } from "../api/baseInterface";

export interface IUserModel extends IBaseInterface {
    username: string;
    surname:string;
    title:string;
    first_name: string;
    other_name: string;
    email: string;
    password: string;
    phone_number: number;
    gender: "Male" | "Female";
    membership_type: "user"  | "admin";
    email_verification_code: string;
    password_reset_code: string;
    shipping_address: string;
    verified: boolean;
    socket_id: string;
    auth_key: string;
    login_id:string;
    player_id: string;
    pass_updated: number;
    nationality: any;
    state: any;
    local_govt:any;
    department:any;
    address:any;
    blood_group:any;
    genotype:any;
    date_of_birth:Date;
    religion: any;
    marital_status:any;
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
