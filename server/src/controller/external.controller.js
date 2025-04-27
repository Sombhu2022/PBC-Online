
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import departmentService from "../services/department.service.js";
import externalService from "../services/external.service.js";
import { sendResponse } from "../utils/response.handler.js";

class ExternalController {

    async createExternal(req, res) {
        try {
            const external = await externalService.create( req.user , req.body );
            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.DEPARTMENT_CREATED,
                success: true,
                data: department,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }

    async updateExternal(req, res) {
        try {
            const external = await externalService.update( req.params , req.body );

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.DEPARTMENT_CREATED,
                success: true,
                data: department,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }

    async deleteExternal(req, res) {
        try {
            const external = await externalService.delete( req.params );

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.DEPARTMENT_CREATED,
                success: true,
                data: department,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }
    async getAllExternal(req, res) {
        try {
            const external = await externalService.getAll( );

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.DEPARTMENT_CREATED,
                success: true,
                data: department,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }


}

export default new ExternalController();
