// dependencies
var mongoose = require("mongoose");

// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;