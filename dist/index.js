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
const config_json_1 = __importDefault(require("../config.json"));
const express_1 = __importDefault(require("express"));
const debuginfo_json_1 = __importDefault(require("../debuginfo.json"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const generateAssets_1 = __importDefault(require("./function/generateAssets"));
const getDominantColor_1 = __importDefault(require("./function/getDominantColor"));
const isDarkColor_1 = __importDefault(require("./function/isDarkColor"));
const imgUrlToBuffer_1 = __importDefault(require("./function/imgUrlToBuffer"));
const imageType_1 = __importDefault(require("./function/imageType"));
const watermark_1 = __importDefault(require("./function/watermark"));
const uploadAssets_1 = __importDefault(require("./function/uploadAssets"));
const setsuccess_1 = __importDefault(require("./function/setsuccess"));
const app = (0, express_1.default)();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../web'));
app.use(express_1.default.json());
app.get('/debug', (req, res) => {
    res.render('debug', { numberOfRequests: debuginfo_json_1.default.numberOfRequests, lastRequestDateAndTime: debuginfo_json_1.default.lastRequestDateAndTime });
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../web/index.html'));
});
app.post(config_json_1.default.endpoint, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pluginInvocationToken, callbackUrl, assets } = req.body;
    if (!pluginInvocationToken || !callbackUrl || !assets) {
        res.status(400).send('Missing required parameters');
        return;
    }
    const imageUrl = assets[0]['url'];
    const uploadUrl = assets[0]['uploadUrl'];
    yield res.status(200).send();
    yield (0, generateAssets_1.default)(pluginInvocationToken, callbackUrl, assets);
    let imageBuffer = yield (0, imgUrlToBuffer_1.default)(imageUrl);
    const imageBase64 = imageBuffer.toString('base64');
    const imageExt = (0, imageType_1.default)(imageBase64);
    let dominantColorRGB = yield (0, getDominantColor_1.default)(imageUrl);
    let isDarkColorValue = yield (0, isDarkColor_1.default)(dominantColorRGB);
    let watermarkBuffer = isDarkColorValue ? fs_1.default.readFileSync(path_1.default.join(__dirname, '../watermark/white.png')) : fs_1.default.readFileSync(path_1.default.join(__dirname, '../watermark/black.png'));
    let watermarked = yield (0, watermark_1.default)(watermarkBuffer, imageBuffer);
    yield (0, uploadAssets_1.default)(uploadUrl, watermarked, imageExt);
    yield (0, setsuccess_1.default)(pluginInvocationToken, callbackUrl);
    debuginfo_json_1.default.numberOfRequests += 1;
    debuginfo_json_1.default.lastRequestDateAndTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    fs_1.default.writeFileSync('./debuginfo.json', JSON.stringify(debuginfo_json_1.default, null, 2));
}));
app.get('/confirmreset', (req, res) => {
    debuginfo_json_1.default.numberOfRequests = 0;
    debuginfo_json_1.default.lastRequestDateAndTime = 'Unknown';
    fs_1.default.writeFileSync('./debuginfo.json', JSON.stringify(debuginfo_json_1.default, null, 2));
    res.redirect('/debug');
});
app.listen(config_json_1.default.port, () => {
    console.log(`Server is running on port ${config_json_1.default.port}`);
});
//# sourceMappingURL=index.js.map