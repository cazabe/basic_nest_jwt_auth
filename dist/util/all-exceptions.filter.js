"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
let AllExceptionsFilter = exports.AllExceptionsFilter = class AllExceptionsFilter {
    constructor() {
        this.getErrorResponse = (status, errorMessage, message, request) => ({
            statusCode: status,
            message,
            error: errorMessage,
            path: request.url,
            method: request.method,
            timeStamp: new Date(),
        });
        this.getErrorLog = (errorResponse, request, exception) => {
            const { statusCode, error } = errorResponse;
            const { method, url } = request;
            const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
        ${JSON.stringify(errorResponse)}\n\n
        User: ${JSON.stringify(request.idUser ?? 'Not signed in')}\n\n
        ${exception instanceof common_1.HttpException ? exception.stack : error}\n\n`;
            return errorLog;
        };
        this.writeErrorLogToFile = (errorLog) => {
            fs.appendFile('error.log', errorLog, 'utf8', (err) => {
                if (err)
                    throw err;
            });
        };
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status;
        let errorMessage;
        let message;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            errorMessage =
                errorResponse.error || exception.message;
            message = exception.message || '';
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = 'Critical internal server error occurred!';
        }
        const errorResponse = this.getErrorResponse(status, errorMessage, message, request);
        const errorLog = this.getErrorLog(errorResponse, request, exception);
        this.writeErrorLogToFile(errorLog);
        response.status(status).json(errorResponse);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map