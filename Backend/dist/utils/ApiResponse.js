"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    statusCode;
    status;
    message;
    data;
    constructor(statusCode, data, message = 'Success') {
        this.statusCode = statusCode;
        this.status = statusCode < 300;
        this.message = message;
        this.data = data;
    }
}
exports.ApiResponse = ApiResponse;
