import { AuthData } from './types';
declare function auth(data: AuthData): Promise<boolean>;
declare const _default: {
    auth: typeof auth;
};
export default _default;
