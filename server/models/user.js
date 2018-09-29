// dependencies
var mongoose = require("mongoose");

// Create Schema class
var Schema = mongoose.Schema;

// Create new user schema
var UserSchema = new Schema({
    displayname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    yourname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        // min: 18,
        // max: 150,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    yourstate: {
        type: String
    },
    profilepic: {
        type: String,
        required: true
    },
    pictures: {
        type: Array
    }
});

// Create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;