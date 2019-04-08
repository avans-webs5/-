const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = require('url')


exports.list_matches = function(req, res){
    
    var page = parseInt(req.query.page, 10);
    var limit = parseInt(req.query.limit, 10);
    
    if (isNaN(page) || page < 1) {
        page = 1;
    }

    if (isNaN(limit)) {
        limit = 10;
    } else if (limit > 10) {
        limit = 10;
    } else if (limit < 1) {
        limit = 1;
    }
     
    var links = {};
    var resultSet = {};
    
    Match.paginate({}, { page: page, limit: limit }, function(err, result){
        if(result.limit < result.total){
            if(page > 1)
                links.prev = "http://localhost:3000/users/"+req.params.id+"/matches?page=" + (page - 1) + "&limit=" + limit;
            
            if(result.page < result.pages) 
                links.next = "http://localhost:3000/users/"+req.params.id+"/matches?page=" + (page + 1) + "&limit=" + limit;
            
            // Add custom navigation links to the result
            result.links = links;
        }
            
        resultSet = result;
        
        res.json(resultSet);
    });
}

exports.get_matches_byUser = function(req, res){
    var query = { users: req.params.id };
    
    if(req.query.with != null){
        query.users = [ req.params.id, req.query.with  ] ;
    }
    var page = parseInt(req.query.page, 10);
    var limit = parseInt(req.query.limit, 10);
    
    if (isNaN(page) || page < 1) {
        page = 1;
    }

    if (isNaN(limit)) {
        limit = 10;
    } else if (limit > 10) {
        limit = 10;
    } else if (limit < 1) {
        limit = 1;
    }
     
    var links = {};
    var resultSet = {};
    
    Match.paginate(query, { page: page, limit: limit }, function(err, result){
        if(result.limit < result.total){
            if(page > 1)
                links.prev = "http://localhost:3000/users/"+req.params.id+"/matches?page=" + (page - 1) + "&limit=" + limit;
            
            if(result.page < result.pages) 
                links.next = "http://localhost:3000/users/"+req.params.id+"/matches?page=" + (page + 1) + "&limit=" + limit;
            
            // Add custom navigation links to the result
            result.links = links;
        }
            
        resultSet = result;
        
        res.json(resultSet);
    });
}

