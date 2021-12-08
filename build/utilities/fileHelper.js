"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var fsconstants = fs_1.default.constants;
var isFileExist = function (inputFile) {
    var flag = true;
    try {
        fs_1.default.accessSync(inputFile, fsconstants.F_OK);
    }
    catch (err) {
        console.log(err);
        flag = false;
    }
    return flag;
};
exports.default = { isFileExist: isFileExist };
