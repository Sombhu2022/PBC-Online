import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import departmentController from "../controller/department.controller.js";
import departmentValidation from "../validations/department.validation.js";
import { authorizeRoles, isAuthenticate } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router
    .post('/', validate(departmentValidation.create), isAuthenticate , authorizeRoles("admin" , "hod") , departmentController.createDepartment)
    .get('/all', departmentController.showDepartmentList) 
    .get('/:departmentId', departmentController.showDepartment)
    .patch('/:departmentId',  isAuthenticate , authorizeRoles("admin" , "hod") , validate(departmentValidation.update), departmentController.updateDepartment)
    .delete('/:departmentId', validate(departmentValidation.delete),  isAuthenticate , authorizeRoles("admin" , "hod") , departmentController.deleteDepartment);

export const departmentRouter = router;
