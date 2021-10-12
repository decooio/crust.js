interface AuthData {
    address: string;
    signature: string;
}
declare class AuthError extends Error {
    constructor(msg: string);
}
export { AuthData, AuthError };
