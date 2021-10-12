"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nacl = require('tweetnacl');
const bs58 = require('bs58');
/**
 * SolanaAuth expects BS58 public address, and hex signature string
 */
function auth(data) {
    const { address, signature } = data;
    return nacl.sign.detached.verify(new TextEncoder().encode(address), Uint8Array.from(Buffer.from(signature, 'hex')), bs58.decode(address));
}
exports.default = {
    auth,
};
