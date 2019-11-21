'use strict';
/* global __static */

import { readFile } from "fs";
import { join } from "path";
const parse = require('csv-parse');


function readVocabBook(fileName) {
  return new Promise((resolve, reject) => {
    readFile(join(__static, fileName + ".csv"), (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        parse(data, {
          trim: true,
          skip_empty_lines: true
        }, (err, output) => {
          if (err) {
            reject(err);
          } else {
            resolve(output);
          }
        })
      }
    })
  })
}


export {
  readVocabBook
}