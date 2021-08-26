import { EducationService } from "./educationService";
import { BaseController } from "../baseController";


export class EducationController extends BaseController{
    private _educationService = new EducationService()

    public getPersonnel = async(data:any) => {
        const staff = await this._educationService.getPersonnel(data)
        return this.sendResponse(staff)
    }
     /**
     * getDoctors
     */
    public getDoctors = async(data:any) => {
        const doctors = await this._educationService.getDoctors(data)
        return this.sendResponse(doctors)
    }
    /**
     * getAcademicStaff
     */
    public getAcademicStaff = async(data:any) => {
        const acade = await this._educationService.getAcademicStaff(data)
        return this.sendResponse(acade)
    }
     /**
     * getNonAcademicStaff
     */
    public getNonAcademictaff = async(data:any) => {
        const nacade = await this._educationService.getNonAcademicStaff(data)
        return this.sendResponse(nacade)
    }
     /**
     * getSeniorLecturers
     */
    public getSeniorLecturer = async(data:any) => {
        const senior = await this._educationService.getSeniorLecturers(data)
        return this.sendResponse(senior)
    }
     /**
     * getJuniorLecturers
     */
    public getJuniorLecturer = async(data:any) => {
        const lecturer = await this._educationService.getJuniorLecturers(data)
        return this.sendResponse(lecturer)
    }


}