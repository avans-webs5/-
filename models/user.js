var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate-v2');

console.log("Initializing user schema");


var userSchema = new mongoose.Schema({
    _id: { type: String },
    facebookId: { type: String },
    googleId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String},
    profilePicture: { type: String},
    birthDate: { type: Date },
    study: { type: String },
    studyYear: { type: Number },
    matches: [{ type: Number, ref: "Match" }],
    likes: [{ type: Number, ref: "User" }],
    dislikes: [{ type: Number, ref: "User" }],
    roles: [{ type: String, ref: "Roles" }]
    //role: { type: "String", ref: "Role"}
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Plugins
userSchema.plugin(mongoosePaginate);

// Mongoose extensions
userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});

userSchema.virtual('age').get(function () {
    if(this.birthDate){
        var ageDifMs = Date.now() - this.birthDate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
    }else{
        return null
    }
});

userSchema.virtual('birthDateFormatted').get(function () {
    if(this.birthDate){
        return this.birthDate.toDateString();
    }else{
        return null
    }
});



userSchema.virtual('numberOfMatches').get(function () {
    if(this.matches === null){
        return 0;
    } else {
        return this.matches.length.toString();
    }
});


mongoose.model("User", userSchema);
