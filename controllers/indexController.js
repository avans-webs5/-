const express = require('express');
var mongoose = require('mongoose');

User = mongoose.model('User');


exports.show_home = function(req, res){
    if(req.get("Accept") && req.get("Accept").toLowerCase() === "application/json"){
        return res.json({ links: [{ name: "damn", url: "blabla" }]});
    } else {
        if (req.user) {
            if (req.user.roles.indexOf("admin") >= 0)
                res.redirect("/admin");
            else
                res.redirect("/profile");
        } else
            return res.render("home");
    }
}
