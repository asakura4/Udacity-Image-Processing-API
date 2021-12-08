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
var express_1 = __importDefault(require("express"));
//import sharp from 'sharp';
// import fs from 'fs';
var imageHelper_1 = __importDefault(require("../utilities/imageHelper"));
var fileHelper_1 = __importDefault(require("../utilities/fileHelper"));
var rs = express_1.default.Router();
var inputPath = './images/full/';
var outputPath = './images/thumbnail/';
function isNumber(value) {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
}
rs.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send('API does not exist.');
        return [2 /*return*/];
    });
}); });
rs.get('/image', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, inputFile, width, height, newFileName, outputFile, imgFlag;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileName = req.query.filename;
                inputFile = inputPath + fileName;
                if (fileName === undefined) {
                    res.send({ error: 'Please input the file name.' });
                    return [2 /*return*/];
                }
                if (!fileHelper_1.default.isFileExist(inputFile)) {
                    console.log('Input file does not exist.');
                    res.send({ error: "Selected image doesn't exist." });
                    return [2 /*return*/];
                }
                width = Number(req.query.width);
                height = Number(req.query.height);
                if (!isNumber(width)) {
                    res.send({ error: 'please check whether width is correct or not.' });
                    return [2 /*return*/];
                }
                else if (!isNumber(height)) {
                    res.send({
                        error: 'please check whether height is correct or not.'
                    });
                    return [2 /*return*/];
                }
                newFileName = fileName
                    .split('.')
                    .slice(0, -1)
                    .join('.') +
                    '_thumb_' +
                    width.toString() +
                    'X' +
                    height.toString() +
                    '.jpg';
                outputFile = outputPath + newFileName;
                //console.log(inputFile);
                //console.log(outputFile);
                if (fileHelper_1.default.isFileExist(outputFile)) {
                    console.log('Output file already exists.');
                    res.sendFile(outputFile, { root: '.' }, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log('Sent: ', outputFile);
                        }
                    });
                    return [2 /*return*/];
                }
                console.log('Start resize image.');
                return [4 /*yield*/, imageHelper_1.default.resizeImage(inputFile, outputFile, width, height)];
            case 1:
                imgFlag = _a.sent();
                if (imgFlag) {
                    res.sendFile(outputFile, { root: '.' }, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log('Sent: ', outputFile);
                        }
                    });
                    return [2 /*return*/];
                }
                else {
                    res.send({ error: 'Failed to resize the image file.' });
                    return [2 /*return*/];
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = rs;
