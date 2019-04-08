var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

console.log("Initializing match schema");

var matchSchema = new mongoose.Schema({
    _id: { type: Number },
    users: [{ type: Number, ref: "User" }],
    chatLines: [{
        userId: { type: Number, ref: "User"},
        message: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now }
    }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

matchSchema.plugin(mongoosePaginate);

mongoose.model("Match", matchSchema);
