// Connect to express and DB Models
const router = require("express").Router();
const db = require("../models");


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