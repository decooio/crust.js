"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createHash = require('create-hash');
const bintools_1 = __importDefault(require("avalanche/dist/utils/bintools"));
const avm_1 = require("avalanche/dist/apis/avm");
const utils_1 = require("avalanche/dist/utils");
const avalanche_1 = require("avalanche");
const _ = __importStar(require("lodash"));
function addressesEquals(address, recoverAddress) {
    return _.toLower(_.trim(recoverAddress)) === _.toLower(_.trim(address));
}
/**
 * Signing process https://docs.avax.network/build/references/cryptographic-primitives#signed-messages
 * Learn from https://github.com/ava-labs/avalanche-wallet/blob/ae64a5f25d319314aadf17fa34aefc10528f23cc/src/helpers/helper.ts#L75
 */
function digestMessage(msgStr) {
    const mBuf = avalanche_1.Buffer.from(msgStr, 'utf8');
    const msgSize = avalanche_1.Buffer.alloc(4);
    msgSize.writeUInt32BE(mBuf.length, 0);
    const msgBuf = avalanche_1.Buffer.from(`\x1AAvalanche Signed Message:\n${msgSize}${msgStr}`, 'utf8');
    return createHash('sha256').update(msgBuf).digest();
}
/**
 * SolanaAuth expects BS58 public address, and hex signature string
 * Learn from https://github.com/ava-labs/avalanche-wallet/blob/ae64a5f25d319314aadf17fa34aefc10528f23cc/src/components/wallet/advanced/VerifyMessage.vue#L61
 */
function auth(data) {
    const bintools = bintools_1.default.getInstance();
    const { address, signature } = data;
    const digest = digestMessage(address);
    const digestBuff = avalanche_1.Buffer.from(digest.toString('hex'), 'hex');
    const hrp = (0, utils_1.getPreferredHRP)();
    const keypair = new avm_1.KeyPair(hrp, 'X');
    const signedBuff = bintools.cb58Decode(signature);
    const pubKey = keypair.recover(digestBuff, signedBuff);
    const addressBuff = keypair.addressFromPublicKey(pubKey);
    const recoveredAddress = bintools
        .addressToString(hrp, 'X', addressBuff)
        .substring(2); // Remove the chain id prefix
    return addressesEquals(address, recoveredAddress);
}
exports.default = {
    auth,
};
