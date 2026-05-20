const express = require("express");

const router = express.Router();

const Problem = require("../models/problem");

const {
  getProblems,
  addProblem
} = require("../controllers/problemController");


// GET all problems
router.get("/", getProblems);


// ADD problem
router.post("/", addProblem);


// TOGGLE SOLVED
router.put("/:id", async (req, res) => {

  try {

    const problem = await Problem.findById(req.params.id);

    problem.solved = !problem.solved;

    await problem.save();

    res.json(problem);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// DELETE problem
router.delete("/:id", async (req, res) => {

  try {

    await Problem.findByIdAndDelete(req.params.id);

    res.json({
      message: "Problem deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;