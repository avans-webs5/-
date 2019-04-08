var mongoose = require('mongoose');
var request = require('request');

User = mongoose.model('User');
Match = mongoose.model('Match');

exports.get_profile = function(req, res){
    var user = req.user.toObject();
    if(!req.body.lat || !req.body.lon){
        res.json(user);
    }else{
        var lat = req.body.lat;
        var lon = req.body.lon;
        request("https://api.opencagedata.com/geocode/v1/json" + "?q=" + lat + "+" + lon + "&key=" + "142dc526608d440f8609235c20949c6c", function (error, response, body) {
            if(response && response.statusCode == 200){
                var jsonBody = JSON.parse(body);
                user.location = jsonBody.results[0].components;
                res.json(user);
            }
        });
    }
}

exports.add_like = function(req, res, next){
    var user = req.user;
    var likedUserID = req.body.user;
    // If the value does not exist in the array
    if(user.likes.indexOf(req.body.user) == -1){
        user.likes.push(req.body.user);
        user.save(function(err) {
            if (err) {
                res.json({ error: true, message: err });
            }else{
                checkIfMatched(user, likedUserID).then(matchObj => {
                    var returnValue = { error: false, message: "Succesfully added like" };
                    if(matchObj && matchObj.isMatched == true){
                        returnValue.isMatched = matchObj.isMatched;
                        returnValue.with = matchObj.with;
                    }
                    res.json(returnValue);
                }).catch(err => {
                    next(err);
                });
            }
        });
    }else{
        res.status(409).json({ error: true, message: "Already liked this person!" });
    }
       
}

function checkIfMatched(user, likedUserID){
    return new Promise((resolve, reject) => {
        User.findById(likedUserID, function(err, u) {
            if (u && u.likes.indexOf(user._id) >= 0) {
                Match
                .findOne()
                .sort("-_id")
                .collation({ locale: "en_US", numericOrdering: true })
                .exec(function (err, match) {  
                    var newId = match._id+1;   
                    Match.create({
                        _id: newId,
                        users: [user._id, likedUserID],
                        chatLines: []
                    }).then(match => {
                        user.matches.push(match._id);
                        user.save(function(err) {
                            if (err) {
                                console.log("Could not make match " + err);
                                reject(err);
                            }
                            else{
                                console.log("Matched user with id " + user._id + " and " + likedUserID);
                                resolve({ isMatched: true, with: likedUserID });
                            }
                        });
                    });
                });
            }else{
                resolve({ isMatched: false });
            }
            
        }); 
    });
    
    

}



exports.add_dislike = function(req, res){
    var dislikedUserID = req.body.user;
    var user = req.user;
    // If the value does not exist in the array
    if(user.dislikes.indexOf(dislikedUserID) == -1){
        user.dislikes.push(dislikedUserID);
        user.save(function(err) {
            if (err)
                res.json({ error: true, message: err });
            else{
                res.json({ error: false, message: "Succesfully added dislike" });
            }
        });
    }else{
        res.status(409).json({ error: true, message: "Already disliked this person!"});
    }
        
}
