"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_crypto_1 = require("@polkadot/util-crypto");
const util_1 = require("@polkadot/util");
function auth(data) {
    const { address, signature } = data;
    try {
        const message = (0, util_1.stringToU8a)(address);
        if ((0, util_crypto_1.signatureVerify)(message, (0, util_1.hexToU8a)(signature), address).isValid) {
            return true;
        }
        const wrappedMessage = (0, util_1.u8aConcat)((0, util_1.u8aToU8a)('<Bytes>'), message, (0, util_1.u8aToU8a)('</Bytes>'));
        return (0, util_crypto_1.signatureVerify)(wrappedMessage, (0, util_1.hexToU8a)(signature), address)
            .isValid;
    }
    catch (error) {
    }
    return false;
}
exports.default = {
    auth,
};
