"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// external imports
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
// middlewares array
var middlewares = [
    (0, cors_1.default)(),
    (0, morgan_1.default)("dev"),
    express_1.default.json(),
    body_parser_1.default.json(),
    express_1.default.urlencoded({
        extended: true,
    }),
];
module.exports = function (app) {
    middlewares.map(function (m) {
        app.use(m);
    });
};
//# sourceMappingURL=common.js.map