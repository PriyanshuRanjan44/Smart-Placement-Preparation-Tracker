const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({

  leetcodeId: {
    type: Number,
    required: true,
    unique: true
  },

  title: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    required: true
  },

  topics: {
    type: [String],
    required: true
  },

  platform: {
    type: String,
    default: "LeetCode"
  },

  solved: {
    type: Boolean,
    default: false
  },

  revisionCount: {
    type: Number,
    default: 0
  },

  lastSolved: {
    type: Date,
    default: null
  },

  notes: {
    type: String,
    default: ""
  }

});

module.exports =
  mongoose.model(
    "Problem",
    problemSchema
  );