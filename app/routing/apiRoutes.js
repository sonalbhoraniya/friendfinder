var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        friends.push(newFriend);

        var diffs = [];
        var sumDiffs = [];

        for (var i = 0; i < friends.length - 1; i++) {
            for (var j = 0; j < 10; j++) {
                var diff = Math.abs(friends[i].scores[j] - newFriend.scores[j]);
                diffs.push(diff)
            }
            var sum = diffs.reduce(function (a, b) {
                return a + b;
            }, 0);
            diffs = []
            sumDiffs.push(sum);
        }
        
        var friendIndex = sumDiffs.indexOf(Math.min(...sumDiffs))
        var chosenFriend = friends[friendIndex]
        res.json(chosenFriend)

    });

};