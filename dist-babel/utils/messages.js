"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const formatMessages = data => {
  const {
    username,
    text,
    time
  } = data;
  return {
    username,
    text,
    time
  };
};

var _default = formatMessages;
exports.default = _default;