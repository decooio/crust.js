"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
class AuthError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}
exports.AuthError = AuthError;
