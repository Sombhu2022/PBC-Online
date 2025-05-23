
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { routineServices } from "../services/routine.service.js";
import { sendResponse } from "../utils/response.handler.js";


class RoutineController {

    async create(req, res) {
        try {

            const result = await routineServices.create(req.body)

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "routine add success !",
                success: true,
                data: result,
            });

        } catch (error) {

            console.log("--------------------- error ", error);
            return sendResponse(res, {
                status: HTTP_STATUS.BAD_REQUEST,
                message: "routine add failed !" ,
                success: true,
                data: result,
            });


        }

    }

    async getAll(req, res) {
        try {

            const result = await routineServices.getAll(req.params)

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "routine get success !",
                success: true,
                data: result,
            });

        } catch (error) {
            console.log("--------------------- error ", error);
             
                        return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "routine get success !",
                success: true,
                data: result,
            });

        }
    }



}

export const routineController = new RoutineController();