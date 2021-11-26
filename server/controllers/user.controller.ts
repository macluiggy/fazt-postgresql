var { User } = require("../models/user.model");

interface ApiCreateUserRequest {
  body: { username: string };
}
interface ApiCreateUserResponse {
  status(val: number): {
    json: (jsonObject: { message: string } | {} | { error: string }) => void;
  };
}
const create = async (
  req: ApiCreateUserRequest,
  res: ApiCreateUserResponse
) => {
  // //console.log(req.body)
  let { body } = req;
  if (!body.username) {
    console.log(body);
    return res.status(400).json({ message: "Username must be provided" });
  }
  let newUser = new User(body);
  interface SavedUser {
    username: string;
    id: number;
  }
  try {
    await newUser.save((error: any, savedUser: SavedUser) => {
      if (!error) {
        interface IObjectKeys {
          [key: string]: string | number;
        }
        let responseObject: IObjectKeys = {};
        responseObject["username"] = savedUser.username;
        responseObject["_id"] = savedUser.id;
        return res.status(200).json(responseObject);
      }
    });
  } catch (err) {
    const u = err  as { message: string }
    return res.status(400).json({
      error: u.message,
    });
  }
};
type ArrayOfUsersElements = {
  _id: number;
  username: string;
  logs: Array<{
    description: string;
    duration: number;
    date: string;
    _id: string;
  }>;
};
type ApiGetAllUsersResponse = {
  json(array: Array<ArrayOfUsersElements>): void;
};
const getAllUsers = (_: any, res: ApiGetAllUsersResponse) => {
  User.find({}, (error: any, arrayOfUsers: ArrayOfUsersElements[]) => {
    if (!error) {
      res.json(arrayOfUsers);
    }
  });
};

module.exports = {
  create,
  getAllUsers,
};
