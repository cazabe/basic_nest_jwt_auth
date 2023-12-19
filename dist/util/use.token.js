"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const useToken = (token) => {
    try {
        const decodeToken = (0, jsonwebtoken_1.decode)(token);
        const currentDate = new Date();
        const expiresDate = new Date(decodeToken.exp);
        return {
            sub: decodeToken.sub,
            role: decodeToken.role,
            isExpired: +expiresDate <= +currentDate / 1000,
        };
    }
    catch (error) {
        return 'Token is invalid';
    }
};
exports.useToken = useToken;
//# sourceMappingURL=use.token.js.map