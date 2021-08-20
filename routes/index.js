// Connect to express and DB Models
const router = require("express").Router();
const db = require("../models");
const mongoose = require("mongoose");


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

router.get("/stats", (req, res) => {
    res.redirect('/stats.html');
});


// GET Last Workout
router.get( "/api/workouts", (req, res) => {
    db.Workout.find()
    .sort({ day : -1 })
    //.populate("exercises")
    .then( workoutdata => {
        console.log("\nRetrieved last workout\n");
        // console.log(workoutdata);
        res.json(workoutdata);
    })
    .catch( err => {
        //console.log(err);
        res.json(err);
    });
});

// GET Workouts Range = "/api/workouts/range" ???

// POST New Workout = "/api/workouts"
router.put("/api/workouts/:id", (req, res) => {

    console.log(`\nAttempting to create workout... ${req.params.id} \n`);
    console.log(req.body)

    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $push:
            { exercises : req.body }
        },
        { new: true }
    )
    .then(

    )
    .catch(
        
    )

    //     }}
    // )

    /** **
    db.Workout.create(body)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
    /** **/
});


// POST Add Exercise = "/api/workouts/" + Workout id



/**

app.post("/submit", ({ body }, res) => {
  db.Note.create(body)
    .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populateduser", (req, res) => {
  db.User.find({})
    .populate("notes")
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
/****/




// STOP FORGETTING THIS!
module.exports = router;