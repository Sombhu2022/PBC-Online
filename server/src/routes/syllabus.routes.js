import express from "express";
import syllabusController from "../controller/syllabus.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import syllabusValidation from "../validations/syllabus.validation.js";
import {
  authorizeRoles,
  isAuthenticate,
} from "../middlewares/authentication.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router
  .post(
    "/",
    upload.single("document"),
    isAuthenticate,
    authorizeRoles("admin", "hod"),
    syllabusController.createSyllabus
  )
  .get("/", syllabusController.showSyllabus)
  .patch(
    "/:syllabusId",
    validate(syllabusValidation.update),
    isAuthenticate,
    authorizeRoles("admin", "hod"),
    syllabusController.updateSyllabus
  )
  .delete(
    "/:syllabusId",
    validate(syllabusValidation.delete),
    isAuthenticate,
    authorizeRoles("admin", "hod"),
    syllabusController.deleteSyllabus
  );

export const syllabusRouter = router;
