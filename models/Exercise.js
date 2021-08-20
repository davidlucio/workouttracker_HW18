const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    _id: Schema.Types.ObjectId,
    type: {
        type: String,
        required: "Exercise type is required"
    },
    name: {
        type: String,
        trim: true,
        required: "Enter a name for the exercise"
    },
    duration: Number,
    distance: Number,
    weight: Number,
    reps: Number,
    sets: Number

});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
