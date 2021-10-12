import { AuthData } from './types';
declare function auth(signatureType: string, data: AuthData): boolean;
declare const _default: {
    auth: typeof auth;
};
export default _default;
