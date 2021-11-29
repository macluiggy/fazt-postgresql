var { Session } = require("../models/session.model");
var { User } = require("../models/user.model");
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
interface ResponseObjectKeys {
  [key: string]: string | number | Logs[] | undefined;
}
interface User extends ResponseObject {}

type ApiAddExerciseRequest = {
  body: { description: string; duration: string; date: string };
  params: { _id: string };
};
type ApiAddExerciseResponse = {
  json(jsonObject: ResponseObjectKeys): void;
};
type ApiAddExercise = {
  (request: ApiAddExerciseRequest, response: ApiAddExerciseResponse): void;
  //tambien se podia sin anidarlo en llaves: (request: ApiAddExerciseRequest, response: ApiAddExerciseResponse) => void;
};
var addExercise: ApiAddExercise = (req, res) => {
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
    (error: any, updatedUser: User) => {
      if (!error && updatedUser) {
        let responseObject: ResponseObjectKeys = {
          _id: "",
          username: "",
          count: undefined,
          log: [],
        };
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
type ApiShowExerciseRequest = {
  params: { _id: string };
  query: { from: Date; to: Date; limit: number };
};
type ApiShowExerciseResponse = {
  json(json: ResponseObject): void;
};
type ApiShowExercise = (
  request: ApiShowExerciseRequest,
  response: ApiShowExerciseResponse
) => void;
var showExercises: ApiShowExercise = (req, res) => {
  let { _id: id } = req.params;
  //console.log(id)
  User.findById(id, (error: any, user: User) => {
    if (!error && user) {
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
