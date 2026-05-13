const mongoose =
    require("mongoose");

const userSchema =
    new mongoose.Schema({

        name: {
            type: String,
            required: true
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

        mobile: String,

        dob: String,

        age: String,

        gender: String,

        education: String,

        college: String,

        location: String,

        occupation: String,

        skills: String,

        linkedin: String,

        github: String,

        website: String,

        bio: String

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "User",
        userSchema
    );