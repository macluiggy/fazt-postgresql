"use strict";
var Session = require("../models/session.model").Session;
var User = require("../models/user.model").User;
var addExercise = function (req, res) {
    var _a = req.body, description = _a.description, duration = _a.duration, date = _a.date;
    var _id = req.params._id;
    console.log(description, duration, date, _id);
    if (!date) {
        date = new Date().toISOString().substring(0, 10);
    }
    var newSession = new Session({
        description: description,
        duration: parseInt(duration),
        date: date,
    });
    User.findByIdAndUpdate(_id, { $push: { log: newSession } }, { new: true }, function (error, updatedUser) {
        if (!error && updatedUser) {
            var responseObject = {};
            var username = updatedUser.username, _id_1 = updatedUser._id;
            var description_1 = newSession.description, duration_1 = newSession.duration, date_1 = newSession.date;
            responseObject["username"] = username;
            responseObject["description"] = description_1;
            responseObject["duration"] = duration_1;
            responseObject["date"] = new Date(date_1).toDateString();
            responseObject["_id"] = _id_1;
            return res.json(responseObject);
        }
        else {
            return res.json({
                error: "user not found",
            });
        }
    });
    //console.log(_id)
    //res.json({ hola: newSession.description })
};
var showExercises = function (req, res) {
    var id = req.params._id;
    //console.log(id)
    User.findById(id, function (error, user) {
        if (!error && user) {
            var responseObject = {};
            var count = user.log.length;
            var username = user.username, _id = user._id, log = user.log;
            responseObject["_id"] = _id;
            responseObject["username"] = username;
            responseObject["count"] = count;
            responseObject["log"] = log.map(function (item) {
                var date = new Date(item.date).toDateString();
                if (date == "Invalid Date") {
                    date = new Date().toDateString();
                }
                item["date"] = date;
                return item;
            });
            if (req.query.from || req.query.to) {
                var fromDate_1 = new Date(0);
                var toDate_1 = new Date();
                if (req.query.from) {
                    fromDate_1 = new Date(req.query.from);
                }
                if (req.query.to) {
                    toDate_1 = new Date(req.query.to);
                }
                fromDate_1 = fromDate_1.getTime();
                toDate_1 = toDate_1.getTime();
                responseObject.log = responseObject.log.filter(function (session) {
                    var sessionDate = new Date(session.date).getTime();
                    return sessionDate >= fromDate_1 && sessionDate <= toDate_1;
                });
            }
            if (req.query.limit) {
                responseObject.log = responseObject.log.slice(0, req.query.limit);
            }
            return res.json(responseObject);
        }
    });
    //res.json({})
};
module.exports = {
    addExercise: addExercise,
    showExercises: showExercises,
};
