"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const authRegistry_1 = __importDefault(require("./authRegistry"));
const _ = require('lodash');
const chainTypeDelimiter = '-';
const pkSigDelimiter = ':';
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Parse basic auth header 'Authorization: Basic [AuthToken]'
        if (!_.includes(req.headers.authorization, 'Basic ')) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                Error: 'Empty Signature',
            }));
            return;
        }
        let isValid = false;
        try {
            // 2. Decode AuthToken
            const base64Credentials = _.split(_.trim(req.headers.authorization), ' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            // 3. Parse AuthToken as `ChainType[substrate/eth/solana].PubKey:SignedMsg`
            const [passedAddress, sig] = _.split(credentials, pkSigDelimiter);
            console.log(`Got public address '${passedAddress}' and sigature '${sig}'`);
            // 4. Extract chain type, default: 'sub' if not specified
            const gaugedAddress = _.includes(passedAddress, chainTypeDelimiter)
                ? passedAddress
                : `sub${chainTypeDelimiter}${passedAddress}`;
            const [chainType, address] = _.split(gaugedAddress, chainTypeDelimiter);
            isValid = yield authRegistry_1.default.auth(chainType, {
                address,
                signature: sig,
            });
            if (isValid === true) {
                console.log(`Validate address: ${address} success`);
                next();
            }
            else {
                console.error('Validation failed');
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    Error: 'Invalid Signature',
                }));
            }
        }
        catch (error) {
            console.error(error.message);
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                Error: error instanceof types_1.AuthError ? error.message : 'Invalid Signature',
            }));
            return;
        }
    });
}
module.exports = auth;
