import express from 'express'
import { adminAuthorize} from '../../middleware';
// import { adminAuthorize } from '../../middleware/adminAuthorization';
import { controllerHandler } from '../../shared/controllerHandler';
import { EducationController } from './educationController';

const router = express.Router();
const call = controllerHandler; 
const Education = new EducationController();

router.get("/personnel",adminAuthorize, call(Education.getPersonnel,(req,res,next) => []));

router.get("/doctors",adminAuthorize,call(Education.getDoctors,(req,res,next) => []));

router.get("/acade",adminAuthorize,call(Education.getAcademicStaff,(req,res,next) => []));

router.get("/nacade",adminAuthorize,call(Education.getNonAcademictaff,(req,res,next) => []));

router.get("/junior",adminAuthorize,call(Education.getJuniorLecturer,(req,res,next) => []));

router.get("/senior",adminAuthorize, call(Education.getSeniorLecturer,(req,res,next) => []));


export const EducationRouter = router