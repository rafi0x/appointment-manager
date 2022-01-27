"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumGen = exports.hashPassword = exports.verifyJWT = exports.generateJWT = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var fs_1 = __importDefault(require("fs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var path_1 = __importDefault(require("path"));
var privateKEY = fs_1.default.readFileSync("".concat(path_1.default.resolve(__dirname, '../credentials'), "/private.key"), 'utf8');
var publicKEY = fs_1.default.readFileSync("".concat(path_1.default.resolve(__dirname, '../credentials'), "/public.key"), 'utf8');
var generateJWT = function (payload) {
    return jsonwebtoken_1.default.sign(payload, privateKEY, { algorithm: 'RS256' });
};
exports.generateJWT = generateJWT;
var verifyJWT = function (payload) {
    return jsonwebtoken_1.default.verify(payload, publicKEY);
};
exports.verifyJWT = verifyJWT;
var hashPassword = function (password) {
    var salt = bcrypt_1.default.genSaltSync(10);
    return bcrypt_1.default.hashSync(password, salt);
};
exports.hashPassword = hashPassword;
function randomNumGen(length) {
    if (length) {
        var output = "";
        for (var i = 1; i <= length; i += 1) {
            output += Math.floor(Math.random() * length);
        }
        return output;
    }
    return '';
}
exports.randomNumGen = randomNumGen;
//# sourceMappingURL=index.js.map