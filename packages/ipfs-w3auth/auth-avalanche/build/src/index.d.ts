import { AuthData } from './types';
/**
 * SolanaAuth expects BS58 public address, and hex signature string
 * Learn from https://github.com/ava-labs/avalanche-wallet/blob/ae64a5f25d319314aadf17fa34aefc10528f23cc/src/components/wallet/advanced/VerifyMessage.vue#L61
 */
declare function auth(data: AuthData): boolean;
declare const _default: {
    auth: typeof auth;
};
export default _default;
