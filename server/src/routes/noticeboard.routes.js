import express from "express";
import noticeboardValidation from "../validations/noticeboard.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import noticeboardController from "../controller/noticeboard.controller.js";
import { upload } from "../middlewares/upload.moddleware.js";
import {
    authorizeRoles,
    isAuthenticate,
} from "../middlewares/authentication.middleware.js";

const router = express.Router();

router
    .post(
        "/",
        isAuthenticate,
        upload.single("notice"),
        authorizeRoles("admin", "hod"),
        // validate(noticeboardValidation.create),
        noticeboardController.createNotice
    )
    .get("/", isAuthenticate, noticeboardController.showNotices)
    .patch(
        "/:noticeId",
        validate(noticeboardValidation.update),
        noticeboardController.updateNotice
    )
    .delete(
        "/:noticeId",
        validate(noticeboardValidation.delete),
        noticeboardController.deleteNotice
    );

export const noticeboardRouter = router;
