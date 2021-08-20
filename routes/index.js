// Connect to express and DB Models
const router = require("express").Router();
const db = require("../models");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;


// Somehow this became the "Create New Workout?"
// POST New Workout = "/api/workouts"
router.get("/exercise", (req, res) => {
    if(req.query.id != undefined){
        res.redirect(`/exercise.html?id=${req.query.id}`);
    }
    else{
        // Create new empty workout...
        db.Workout.create({
            _id: mongoose.Types.ObjectId(),
            day: new Date(),
            exercises: [] 
        })
        .then( newWorkoutData => {
            res.redirect(`/exercise.html?id=${newWorkoutData._id}`);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    }
});

// This is the stats page I guess?
router.get("/stats", (req, res) => {
    res.redirect('/stats.html');
});


// GET Last Workout
router.get( "/api/workouts", (req, res) => {
    db.Workout.find({
        exercises: {
            $exists: true,
            $not: {$size: 0}
        }
    })
    //.populate("exercises")
    .then( workoutdata => {
        res.json(workoutdata);
    })
    .catch( err => {
        //console.log(err);
        res.json(err);
    });
});


// PUT Add Exercise = "/api/workouts/" + Workout id
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id : new ObjectId(req.params.id) },
        { $push:
            { exercises : req.body }
        },
        { new: true }
    )
    .then( newExerciseData => {
        res.json(newExerciseData);
    })
    .catch( err => {
        res.json(err);
    });
});


// GET Workouts Range = "/api/workouts/range" ???





// STOP FORGETTING THIS!
module.exports = router;