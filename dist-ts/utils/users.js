"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.removeUser = exports.addUser = void 0;
var users = [];
var addUser = function (id, username) {
    var user = {
        id: id,
        username: username,
    };
    users.push(user);
};
exports.addUser = addUser;
var removeUser = function (id) {
    users = users.filter(function (aUser) { return aUser.id !== id; });
};
exports.removeUser = removeUser;
var getCurrentUser = function (id) { return users.find(function (aUser) { return aUser.id === id; }); };
exports.getCurrentUser = getCurrentUser;
