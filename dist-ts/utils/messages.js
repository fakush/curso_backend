"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatMessages = function (data) {
    var username = data.username, text = data.text, time = data.time;
    return {
        username: username,
        text: text,
        time: time,
    };
};
exports.default = formatMessages;
