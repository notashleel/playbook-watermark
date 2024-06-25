"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(base64) {
    if (base64.startsWith("/")) {
        return 'jpeg';
    }
    else if (base64.startsWith("i")) {
        return 'png';
    }
    else if (base64.startsWith("U")) {
        return 'webp';
    }
    else if (base64.startsWith("P")) {
        return 'svg';
    }
    return 'other';
}
//# sourceMappingURL=imageType.js.map