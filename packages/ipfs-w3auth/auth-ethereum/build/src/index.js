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
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const ethers_1 = require("ethers");
function addressesEquals(address, recoverAddress) {
    return _.toLower(_.trim(recoverAddress)) === _.toLower(_.trim(address));
}
function auth(data) {
    const { address, signature } = data;
    const signatureWithPrefix = _.startsWith(_.toLower(signature), '0x')
        ? signature
        : `0x${signature}`;
    // For some signing tools like mycrypto, we can directly verify the signature
    let recoveredAddress = ethers_1.ethers.utils.verifyMessage(address, signatureWithPrefix);
    if (addressesEquals(address, recoveredAddress)) {
        return true;
    }
    // Some some signing tools like myetherwallet, we need hash the message before recover
    const hashBytes = ethers_1.ethers.utils.arrayify(address);
    const messageHash = ethers_1.ethers.utils.hashMessage(hashBytes);
    recoveredAddress = ethers_1.ethers.utils.recoverAddress(messageHash, signatureWithPrefix);
    return addressesEquals(address, recoveredAddress);
}
exports.default = {
    auth,
};
