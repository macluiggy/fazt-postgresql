const { Session } = require("../models/session.model");
var { User } = require("../models/user.model");

const addExercise = (req, res) => {
  let { description, duration, date } = req.body;
  let { _id } = req.params;
  console.log(description, duration, date, _id);
  if (!date) {
    date = new Date().toISOString().substring(0, 10);
  }
  let newSession = new Session({
    description: description,
    duration: parseInt(duration),
    date: date,
  });

  User.findByIdAndUpdate(
    _id,
    { $push: { log: newSession } },
    { new: true },
    (error, updatedUser) => {
      if (!error && updatedUser) {
        let responseObject = {};
        let { username, _id } = updatedUser;
        let { description, duration, date } = newSession;

        responseObject["username"] = username;
        responseObject["description"] = description;
        responseObject["duration"] = duration;
        responseObject["date"] = new Date(date).toDateString();
        responseObject["_id"] = _id;
        return res.json(responseObject);
      } else {
        return res.json({
          error: "user not found",
        });
      }
    }
  );
  //console.log(_id)
  //res.json({ hola: newSession.description })
};
type ApiShowExerciseRequest {
  
}
const showExercises = (req, res) => {
  let { _id: id } = req.params;
  //console.log(id)
  User.findById(id, (error, user) => {
    if (!error && user) {
      interface Logs {
        description: string;
        duration: number;
        date: string;
        _id: string;
      }
      interface ResponseObject {
        _id: string;
        username: string;
        count: number | undefined;
        log: Array<Logs>;
      }
      let responseObject: ResponseObject = {
        _id: "",
        username: "",
        count: undefined,
        log: [],
      };
      let count = user.log.length;
      let { username, _id, log } = user;
      responseObject["_id"] = _id;
      responseObject["username"] = username;
      responseObject["count"] = count;
      responseObject["log"] = log.map((item: Logs) => {
        let date = new Date(item.date).toDateString();
        if (date == "Invalid Date") {
          date = new Date().toDateString();
        }
        item["date"] = date;
        return item;
      });

      if (req.query.from || req.query.to) {
        let fromDate: Date | number = new Date(0);
        let toDate: Date | number = new Date();

        if (req.query.from) {
          fromDate = new Date(req.query.from);
        }
        if (req.query.to) {
          toDate = new Date(req.query.to);
        }

        fromDate = fromDate.getTime();
        toDate = toDate.getTime();

        responseObject.log = responseObject.log.filter((session) => {
          let sessionDate = new Date(session.date).getTime();

          return sessionDate >= fromDate && sessionDate <= toDate;
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
  addExercise,
  showExercises,
};
