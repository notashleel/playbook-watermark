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
exports.Watermark = void 0;
const canvas_1 = __importDefault(require("canvas"));
class Watermark {
    put(watermark, background) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvasBackground = yield canvas_1.default.loadImage(background);
            const canvasWatermark = yield canvas_1.default.loadImage(watermark);
            const canvas = canvas_1.default.createCanvas(canvasBackground.width, canvasBackground.height);
            const ctx = canvas.getContext('2d');
            yield ctx.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);
            let canvasWidth = canvas.width;
            let canvasHeight = canvas.height;
            let watermarkWidth = canvasWatermark.width;
            let watermarkHeight = canvasWatermark.height;
            if (watermarkWidth == watermarkHeight) {
                if (canvasWidth > canvasHeight) {
                    yield ctx.drawImage(canvasWatermark, 0, 0, canvasWidth, watermarkHeight * (canvasWidth / watermarkWidth));
                }
                else {
                    yield ctx.drawImage(canvasWatermark, 0, 0, watermarkWidth * (canvasHeight / watermarkHeight), canvasHeight);
                }
            }
            else if (canvasWidth == canvasHeight) {
                if (watermarkWidth > watermarkHeight) {
                    yield ctx.drawImage(canvasWatermark, 0, 0, watermarkWidth * (canvasWidth / watermarkHeight), canvasHeight);
                }
                else {
                    yield ctx.drawImage(canvasWatermark, 0, 0, canvasWidth, watermarkHeight * (canvasWidth / watermarkWidth));
                }
            }
            else {
                if (canvasWidth > canvasHeight) {
                    if (watermarkWidth > watermarkHeight) {
                        yield ctx.drawImage(canvasWatermark, 0, 0, watermarkWidth * (canvasHeight / watermarkHeight), canvasHeight);
                    }
                    else {
                        yield ctx.drawImage(canvasWatermark, 0, 0, canvasWidth, watermarkHeight * (canvasWidth / watermarkWidth));
                    }
                }
                else {
                    if (watermarkWidth > watermarkHeight) {
                        yield ctx.drawImage(canvasWatermark, 0, 0, watermarkWidth * (canvasHeight / watermarkHeight), canvasHeight);
                    }
                    else {
                        yield ctx.drawImage(canvasWatermark, 0, 0, canvasWidth, watermarkHeight * (canvasWidth / watermarkWidth));
                    }
                }
            }
        });
    }
}
exports.Watermark = Watermark;
//# sourceMappingURL=watermark.js.map