function checkMillionDollarIdea (req, res, next) {
  const numWeeks = req.body.numWeeks;
  const weeklyRevenue = req.body.weeklyRevenue;
  
  if (numWeeks === undefined || weeklyRevenue === undefined || isNaN(numWeeks) || isNaN(weeklyRevenue)) {
    res.status(400).send("Bad request: numWeeks and weeklyRevenue must be provided as numbers");
  } else if (numWeeks * weeklyRevenue < 1000000) {
    res.status(400).send("Bad request: Idea does not yield at least one million dollars");
  } else {
    // Call next() if the idea is valid
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
