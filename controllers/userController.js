const express = require('express');
var mongoose = require('mongoose');

User = mongoose.model('User');

const { check, validationResult } = require('express-validator/check');

// Get users
exports.list_users = function(req, res){
    var query = {}
    var page = parseInt(req.query.page, 10);
    var limit = parseInt(req.query.limit, 10);

    delete req.query.page;
    delete req.query.limit;
    
    // Validating page and limit input
    if (isNaN(page) || page < 1) {
        page = 1;
    }

    if (isNaN(limit)) {
        limit = 10;
    } else if (limit > 50) {
        limit = 50;
    } else if (limit < 1) {
        limit = 1;
    }


    var links = {};
    var resultSet = {};
    
    User.paginate(req.query, { page: page, limit: limit }, function(err, result){
        if(result.hasPrevPage)
            links.prev = "http://localhost:3000/users?page=" + (page - 1) + "&limit=" + limit;
          
        if(result.hasNextPage) 
            links.next = "http://localhost:3000/users?page=" + (page + 1) + "&limit=" + limit;
        
        // Add custom navigation links to the result
        result.links = links;
        
            
        resultSet = result;
        
        res.json(resultSet);
    });
}

// Get user by ID
exports.get_user_byID = function(req, res){
    var query = { _id: req.params.id };

    User.find(query)
        .then(data => { res.json(data); })
        .catch(err => console.log(err));
}

// Add user
exports.add_user = function(req, res){
    
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    User
    .findOne()
    .sort("-_id")
    .collation({locale: "en_US", numericOrdering: true})
    .exec(function (err, user) {  
        console.log(user);
        User.create({
            _id: parseInt(user._id)+1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            profilePicture: "https://www.argentum.org/wp-content/uploads/2018/12/blank-profile-picture-973460_6404.png",
            birthDate: req.body.birthDate,
            study: req.body.study,
            studyYear: req.body.studyYear,
            likes: [],
            dislikes: [],
            matches: []
        }).then(user => res.json(user));  
    });
}

// Delete user
exports.delete_user = function(req, res){
    // Finds a user and deletes it
    User.find({ _id: req.params.id }).deleteOne().exec(function(err, data) {
        // data will equal the number of docs removed, not the document itself
        if (err) 
            res.send(handleError(err));
        else
            res.json(data) // Check data.deletedCount of data.n if a user has been deleted
        
    });
}


// Edit user
exports.edit_user = function(req, res){
    User.findById(req.params.id, function(err, u) {
        if (!u)
          res.send("Error: could not find user");
        else {
          // do your updates here
            u.password = req.body.password;
            u.profilePicture = req.body.profilePicture;
            u.study = req.body.study;
            u.studyYear = req.body.studyYear;
      
            u.save(function(err) {
                if (err)
                    res.json({ error: true, message: err});
                else
                    res.json({ error: false, message: "Succesfully edited user."})
            });
        }
      });
}
