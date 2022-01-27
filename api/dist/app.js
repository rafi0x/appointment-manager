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
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var common_1 = __importDefault(require("./middlewares/common"));
var index_1 = __importDefault(require("./routes/index"));
dotenv.config();
var app = (0, express_1.default)();
(0, common_1.default)(app);
app.use('/api', index_1.default);
mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/appointment')
    .then(function () {
    console.log("Database connected");
    // main web server
    app.listen(process.env.POST || '8083', function () { return console.log("server on ".concat(process.env.PORT || '8083')); });
})
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=app.js.map