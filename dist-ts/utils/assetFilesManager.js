"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var AuxFile = /** @class */ (function () {
    function AuxFile(fileName) {
        this.fileName = path_1.default.resolve(__dirname, "../../assets/" + fileName);
        this.body = [];
    }
    AuxFile.prototype.read = function () {
        var data = fs_1.default.readFileSync(this.fileName, 'utf-8', function (error, fileData) {
            if (error)
                return console.log('Error lectura Asíncrona', error);
            console.log('done');
            return JSON.parse(fileData);
        });
        return data;
    };
    AuxFile.prototype.write = function (data) {
        fs_1.default.appendFile(this.fileName, "\n " + data, function (err) {
            if (err)
                console.log(err);
            return console.log('done');
        });
    };
    return AuxFile;
}());
exports.default = AuxFile;
