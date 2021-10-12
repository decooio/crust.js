"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const ipfs_w3auth_substrate_1 = __importDefault(require("@crustio/ipfs-w3auth-substrate"));
const ipfs_w3auth_ethereum_1 = __importDefault(require("@crustio/ipfs-w3auth-ethereum"));
const ipfs_w3auth_solana_1 = __importDefault(require("@crustio/ipfs-w3auth-solana"));
const ipfs_w3auth_avalanche_1 = __importDefault(require("@crustio/ipfs-w3auth-avalanche"));
const ipfs_w3auth_flow_1 = __importDefault(require("@crustio/ipfs-w3auth-flow"));
const _ = require('lodash');
const mapBySigType = (sigTypes, authObject) => {
    return _.zipObject(sigTypes, _.fill(Array(_.size(sigTypes)), authObject));
};
const authProviders = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, mapBySigType(['substrate', 'sub', 'crust', 'cru'], ipfs_w3auth_substrate_1.default)), mapBySigType(['ethereum', 'eth', 'polygon', 'pol'], ipfs_w3auth_ethereum_1.default)), mapBySigType(['solana', 'sol', 'near', 'nea'], ipfs_w3auth_solana_1.default)), mapBySigType(['avalanche', 'ava'], ipfs_w3auth_avalanche_1.default)), mapBySigType(['flow'], ipfs_w3auth_flow_1.default));
function auth(signatureType, data) {
    const authProvider = _.get(authProviders, _.toLower(_.trim(signatureType)), null);
    if (_.isEmpty(authProvider)) {
        throw new types_1.AuthError('Unsupported web3 signature');
    }
    return authProvider.auth(data);
}
exports.default = {
    auth,
};
