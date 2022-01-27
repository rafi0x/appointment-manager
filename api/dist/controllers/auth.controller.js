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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.authUser = void 0;
var User_schema_1 = __importDefault(require("../Schemas/User.schema"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var utilities_1 = require("../utilities");
var authUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, userData, matchPass, jwtPayload, jwtToken, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                if (!(username && password)) return [3 /*break*/, 6];
                return [4 /*yield*/, User_schema_1.default.findOne({ username: username })];
            case 2:
                userData = _b.sent();
                if (!userData) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt_1.default.compare(password, userData.password)];
            case 3:
                matchPass = _b.sent();
                if (matchPass) {
                    jwtPayload = {
                        name: userData.username,
                        isAdmin: true,
                        expiresIn: Date.now() * 120, //expire in 1h
                    };
                    jwtToken = (0, utilities_1.generateJWT)(jwtPayload);
                    if (jwtToken)
                        return [2 /*return*/, res.json({ token: jwtToken })];
                    else
                        return [2 /*return*/, res.status(500).json({ serverErr: 'server error' })];
                }
                else {
                    return [2 /*return*/, res.status(400).json({ clientErr: 'invalid username or password' })];
                }
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(400).json({ clientErr: 'invalid username or password' })];
            case 5: return [3 /*break*/, 7];
            case 6: return [2 /*return*/, res.status(400).json({ clientErr: 'invalid username or password' })];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _b.sent();
                console.log('authUser: ', err_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.authUser = authUser;
var verifyToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded;
    return __generator(this, function (_a) {
        token = req.header('token');
        if (token != undefined) {
            decoded = (0, utilities_1.verifyJWT)(token);
            console.log(decoded);
            if (decoded) {
                if (decoded.expiresIn < Date.now()) {
                    console.log(decoded.expiresIn < Date.now());
                    return [2 /*return*/, res.status(403).json({ clientErr: 'Invalid token or expired, Login again' })];
                }
                else {
                    next();
                }
            }
            else {
                console.log('in code');
                return [2 /*return*/, res.status(402).json({ clientErr: 'Invalid token or expired, Login again' })];
            }
        }
        else {
            return [2 /*return*/, res.status(401).json({ clientErr: 'Invalid token or expired, Login again' })];
        }
        return [2 /*return*/];
    });
}); };
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.controller.js.map