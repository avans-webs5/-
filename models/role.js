var mongoose = require('mongoose');

console.log("Initializing role schema");

var roleSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


mongoose.model("Role", roleSchema);