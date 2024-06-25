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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(_a) {
    return __awaiter(this, arguments, void 0, function* ([r, g, b]) {
        let colorArray = [r / 255, g / 255, b / 255].map(function (v) {
            if (v <= 0.03928) {
                return v / 12.92;
            }
            return Math.pow((v + 0.055) / 1.055, 2.4);
        });
        let luminance = 0.2126 * colorArray[0] + 0.7152 * colorArray[1] + 0.0722 * colorArray[2];
        return luminance <= 0.179;
    });
}
//# sourceMappingURL=isDarkColor.js.map