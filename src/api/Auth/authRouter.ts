import express from "express";
import passport from "passport";
import { loginStrategy, signupStrategy, adminLoginStrategy, adminSignupStrategy } from "../../middleware/passport";
import { validation } from "../../middleware/validation";
import { controllerHandler } from "../../shared/controllerHandler";
import { AuthController } from "./authController";
import { LoginValidationSchema, SignupValidationSchema, RefreshTokensValidationSchema } from "./authValidation";
import { authorize } from "../../middleware";

const router = express.Router();
const call = controllerHandler;
const Auth = new AuthController();

passport.use("signup", signupStrategy);
passport.use("login", loginStrategy);
passport.use("adminLogin", adminLoginStrategy);
passport.use("adminSignUp",adminSignupStrategy)

router.post("/signup", [validation(SignupValidationSchema), passport.authenticate("signup", { session: false })],
  call(Auth.signup, (req, res, next) => [req.user]));

router.post("/admin-signup", [validation(SignupValidationSchema), passport.authenticate("adminSignUp", { session: false })],
  call(Auth.signup, (req, res, next) => [req.user]));

router.post("/signin", [validation(LoginValidationSchema)],
  call(Auth.login, (req, res, next) => [req, res, next]));

router.post("/admin-signin", [validation(LoginValidationSchema)],
  call(Auth.adminLogin, (req, res, next) => [req, res, next]));

router.post("/logout", authorize, call(Auth.logout, (req, _res, _next) => [req.user]));

router.post("/request-reset/:email", call(Auth.requestPasswordReset, (req, _res, _next) => [req.params.email]));

router.get("/verify-code", call(Auth.verifyResetCode, (req, _res, _next) => [req.query.c]));
// router.get("/send-sms", call(Auth.sendSMSRequest, (req, _res, _next) => []));

router.post("/reset-password", call(Auth.resetPassword, (req, _res, _next) => [req.body.code, req.body.password]));

router.post("/refresh-token", validation(RefreshTokensValidationSchema),
  call(Auth.refreshTokens, (req, res, next) => [req.body]));

router.post("/:id/generateTokens",
  call(Auth.refreshTokensById, (req, res, next) => [req.params.id]));

router.get("/", (rq, rs) => rs.send("good"));

export const AuthRouter = router;
