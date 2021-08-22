/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

export default class AuxFile {
  constructor(fileName) {
    this.fileName = path.resolve(__dirname, `../../assets/${fileName}`);
    this.body = [];
  }

  read() {
    const data = fs.readFileSync(this.fileName, 'utf-8', (error, fileData) => {
      if (error) return console.log('Error lectura Asíncrona', error);
      console.log('done');
      return JSON.parse(fileData);
    });
    return data;
  }

  write(data) {
    fs.appendFile(this.fileName, `\n ${data}`, (err) => {
      if (err) console.log(err);
      return console.log('done');
    });
  }
}
