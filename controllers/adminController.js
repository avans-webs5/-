const express = require('express');
var mongoose = require('mongoose');

User = mongoose.model('User');

// Home
exports.show_home = function (req, res) {
    return res.render("admin/index", { layout: "admin", user: req.user, homePage: true });
}

// Users
exports.show_users = function (req, res) {
    users: User.find({}, function (err, users) {
        console.log(users);
        return res.render("admin/users", {
            layout: "admin",
            user: req.user,
            users: users,
            usersPage: true
        });
    });
}

// Matches
exports.show_matches = function (req, res) {
    return res.render("admin/matches", { layout: "admin", user: req.user, matchesPage: true });
}

// Roles
exports.show_roles = function (req, res) {
    return res.render("admin/roles", { layout: "admin", user: req.user, rolesPage: true });
}