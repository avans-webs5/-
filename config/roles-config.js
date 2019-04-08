
var mongoose = require('mongoose');
var ConnectRoles = require('connect-roles');
User = mongoose.model('User');
var roles = new ConnectRoles();

var roles = new ConnectRoles({
    failureHandler: function (req, res, action) {
        res.status(403).json({
            message: 'access denied',
            action: action
        });
    }
});

roles.use('self', function(req){
	if(req.user){
		if(req.user.id == req.params.id || req.user.roles.indexOf("admin") >= 0){
			return true;
		}
	}
});

roles.use('admin', function (req) {
	if(req.user){
		var adminRoleIndex = req.user.roles.indexOf("admin");
		if(adminRoleIndex >= 0){
			return true;
		};
		// Don't return false, this way we can get into the next checker.
	}
});

module.exports = roles;