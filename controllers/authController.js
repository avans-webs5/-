const express = require('express');
var mongoose = require('mongoose');

User = mongoose.model('User');


exports.login = function(req, res){
    if(req.get("Accept") && req.get("Accept").toLowerCase() === "application/json"){
        return res.json(req.user);
    }else{
        res.cookie('token',req.user.token, { httpOnly: true })
        return res.redirect("/");
    }
}
