
const checkMillionDollarIdea = (req, res, next) => {
  const numWeeks = req.body.numWeeks;
  const weeklyRevenue = req.body.weeklyRevenue;
  if (
    (numWeeks &&
      weeklyRevenue &&
      typeof numWeeks == "number" &&
      typeof weeklyRevenue == "number") ||
    numWeeks * weeklyRevenue >= 1000000
  ) {
    next();
  } else {
    res.status(400).send("invalid input");
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = { checkMillionDollarIdea };
