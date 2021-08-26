import { EducationModel} from "./educationModel";


export class EducationService {
    public getPersonnel = async (data:any) => {
        let personnel =  await EducationModel.findAndCountAll({
            // where:{
            //     membership_type :[ "user" || "admin"]
            // },
            attributes:{
            exclude:["password","email_verification_code","auth_key","refresh_token"]
        }})
      
       return (personnel.count)
    }  

    public getDoctors = async (data:any) => {
        let doctors = await EducationModel.findAndCountAll({
            where: {
                title: "Dr"
            },
            attributes:{
                exclude:["password","email_verification_code","auth_key","refresh_token"]
            }})
         return (doctors.count)  
    }

    public getAcademicStaff = async (data:any) => {
        let academicStaff = await EducationModel.findAndCountAll({
            where: {
                category: "Academic Staff"
            },
            attributes:{
                exclude:["password","email_verification_code","auth_key","refresh_token"]
            }})
           return (academicStaff.count)
    }

    public getNonAcademicStaff = async (data:any) => {
        let nacades = await EducationModel.findAndCountAll({
            where: {
                category: "Non Academic Staff"
            },
            attributes:{
                exclude:["password","email_verification_code","auth_key","refresh_token"]
            }})
        return(nacades.count)
    }

    public getSeniorLecturers = async (data:any) => {
        let seniors = await EducationModel.findAndCountAll({
            where: {
                position : "Senior Lecturer"
            },
            attributes:{
                exclude:["password","email_verification_code","auth_key","refresh_token"]
            }})
        return(seniors.count)
    }

    public getJuniorLecturers = async(data:any) => {
        let junior = await EducationModel.findAndCountAll({
            where: {
                position : "Junior Lecturer"
            },
            attributes:{
                exclude:["password","email_verification_code","auth_key","refresh_token"]
            }})
        return(junior.count)
    }
}