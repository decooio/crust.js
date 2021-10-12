import { AuthData } from './types';
/**
 * SolanaAuth expects BS58 public address, and hex signature string
 */
declare function auth(data: AuthData): boolean;
declare const _default: {
    auth: typeof auth;
};
export default _default;
