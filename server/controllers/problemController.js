const Problem = require("../models/problem");

// GET all problems
const getProblems = async (req, res) => {
  const problems = await Problem.find();

  res.json(problems);
};

// ADD problem
const addProblem = async (req, res) => {
  const newProblem = new Problem(req.body);

  const savedProblem = await newProblem.save();

  res.json(savedProblem);
};

// TOGGLE solved
const toggleSolved = async (req, res) => {
  const problem = await Problem.findById(req.params.id);

  problem.solved = !problem.solved;

  await problem.save();

  res.json(problem);
};

// DELETE problem
const deleteProblem = async (req, res) => {
  await Problem.findByIdAndDelete(req.params.id);

  res.json({ message: "Problem deleted" });
};

module.exports = {
  getProblems,
  addProblem,
  toggleSolved,
  deleteProblem
};