import express from "express";
import { authorize,adminAuthorize  } from "../../middleware";
import { controllerHandler } from "../../shared/controllerHandler";
import { UserController } from "./userController";
// import { UserValidationSchema } from "./userValidation";

const router = express.Router();
const call = controllerHandler;
const User = new UserController();

router.use(authorize);
// router.use(validation(UserValidationSchema));

router.get("/", call(User.index, (req, res, next) => []));

router.get("/all",adminAuthorize, call(User.getAllUsers,(req,res,next) => [ req.query.per_page,req.query.order_next, req.query.order_prev,]));

router.put("/update",adminAuthorize,call(User.updateUser, (req, res, next) => [req.user, req.body]));

router.get("/:username", call(User.getUser, (req, res, next) => [req.params.username]));

router.get("/:username/status", call(User.getUserStatus, (req, _res, _next) => [req.params.username]));

export const UserRouter = router;
