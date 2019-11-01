let matches = require("../data/friends.js");

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(matches);
  });

  app.post("/api/friends", function (req, res) {

    let bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    let userData = req.body;
    let userScores = userData.scores;

    let totalDifference = 0;

    for (let i = 0; i < matches.length; i++) {
      
      totalDifference = 0;

      for (let j = 0; i < matches[i].scores[j]; j++) {
        totalDifference += Math.abs(userScores[j]) - (matches[i].scores[j]);

        if (totalDifference <= bestMatch.friendDifference){
          bestMatch.name = matches[i].name;
          bestMatch.photo = matches[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    matches.push(userData);

    res.json(bestMatch);
    console.log(bestMatch);


});

}