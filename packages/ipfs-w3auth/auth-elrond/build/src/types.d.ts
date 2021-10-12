interface AuthData {
    address: string;
    txMsg: string;
    signature: string;
}
declare class AuthError extends Error {
    constructor(msg: string);
}
export { AuthData, AuthError };
