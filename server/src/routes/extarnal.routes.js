import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { authorizeRoles, isAuthenticate } from "../middlewares/authentication.middleware.js";
import externalValidation from "../validations/external.validation.js";
import externalController from "../controller/external.controller.js";

const router = express.Router();

router
    .post('/', validate(externalValidation.create), isAuthenticate , authorizeRoles("admin" , "hod") , externalController.createExternal )
    .patch('/:externalId', validate(externalValidation.update), isAuthenticate , authorizeRoles("admin" , "hod") , externalController.updateExternal )
    .delete('/:externalId', validate(externalValidation.delete), isAuthenticate , authorizeRoles("admin" , "hod") , externalController.deleteExternal )
    .get('/', isAuthenticate , authorizeRoles("admin" , "hod") , externalController.getAllExternal )
    // .get('/:externalId', isAuthenticate , authorizeRoles("admin" , "hod") , externalController.getExternalById )
export const externalRouter = router;
