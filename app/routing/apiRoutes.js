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
                // console.log(diffs)
            }
            var sum = diffs.reduce(function (a, b) {
                return a + b;
            }, 0);
            diffs = []
            sumDiffs.push(sum);
            console.log("array of diffs: "+sumDiffs);
        }
        console.log(typeof sumDiffs[0] )
        // console.log("Below should be 3")
        // console.log("math min sumDiffs: ")
        // console.log(Math.min(...sumDiffs))
        var friendIndex = sumDiffs.indexOf(Math.min(...sumDiffs))
        // console.log(bestFriendIndex)
        var chosenFriend = friends[friendIndex]
        console.log(chosenFriend)
        // res.json(newBestie)
        res.json(chosenFriend)

    });

};