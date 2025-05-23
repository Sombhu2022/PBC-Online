import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import semesterController from "../controller/semester.controller.js";
import semesterValidation from "../validations/semester.validation.js";
import { authorizeRoles, isAuthenticate } from "../middlewares/authentication.middleware.js";
import { routineController } from "../controller/routine.controller.js";

const router = express.Router();

router
    .post('/',  isAuthenticate , authorizeRoles("admin" , "hod") , routineController.create)
    .get('/semester-details/:semesterId', semesterController.showSemester)
    .get('/:departmentId', semesterController.showAllSemester)
    .patch('/:semesterId', isAuthenticate , authorizeRoles("admin" , "hod") , validate(semesterValidation.update), semesterController.updateSemester)
    .delete('/:semesterId', isAuthenticate , authorizeRoles("admin" , "hod") , validate(semesterValidation.delete), semesterController.deleteSemester);

export const routineRouter = router;
