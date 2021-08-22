"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
class AuxFile {
  constructor(fileName) {
    this.fileName = _path.default.resolve(__dirname, `../../assets/${fileName}`);
    this.body = [];
  }

  read() {
    const data = _fs.default.readFileSync(this.fileName, 'utf-8', (error, fileData) => {
      if (error) return console.log('Error lectura Asíncrona', error);
      console.log('done');
      return JSON.parse(fileData);
    });

    return data;
  }

  write(data) {
    _fs.default.appendFile(this.fileName, `\n ${data}`, err => {
      if (err) console.log(err);
      return console.log('done');
    });
  }

}

exports.default = AuxFile;