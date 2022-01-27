"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumGen = void 0;
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