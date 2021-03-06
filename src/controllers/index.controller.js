const { Pool } = require("pg");

// aqui se va a especificar la connection a la base de datos con los valores de la misma
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "0000",
  database: "firstapi",
  post: "5432",
});
class IndexController {
  static fn = {
    getUsers: async (req, res) => {
      try {
        // se recibe la respuesta, esto se realiza desde la conecion que se hizo en pool, lo que hace es que pool tiene un metodo query donde pondes el comando que se quiere realizar en la base de datos, esta quiere decir que desde la base de datos 'users' seleccione todos los items y los guarde un una variable, esta variable sera un array conteninedo cada dato guardado
        const { rows } = await pool.query("SELECT * FROM users"); //tanto SELECT como FROM se pueden usar con mayusculas o minusculas
        console.log(rows);
        // res.send('users')
        res.status(200).json(rows);
      } catch (error) {
        console.log(error);
      }
    },

    getUserById: async (req, res) => {
      const { id } = req.params;
      // res.send("user by id: " + id);
      try {
        // selecciona todos lo valores de la base de datos desde la table users donde el id sea igual a $1
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
          id,
        ]);
        const { length } = rows;
        if (!length) return res.send("user not found");
        console.log(rows);
        res.json(rows);
      } catch (error) {
        console.log(error);
      }
    },

    createUser: async (req, res) => {
      // res.send('users')
      // console.log(req.body);
      const { name, email } = req.body;

      // aqui se creara el usuario y tomara los valores a guardar del req.body, estos se guardaran con el commando que se muestra en el primer argumento que toma el metodo pool.query, despues de values se pone el numero al que corresponde cada valor y en el segundo argumento del metodo se ponen los valores que corresponde a los numeros segun su orden, es necesario ponerlo en el orden correcto ya que  si se pone $2, $1 hara que se guarden al revez, osea que el nombre se guardara como email y el email como nombre
      const response = await pool.query(
        `INSERT INTO users (name, email) VALUES ($1, $2)`,
        [name, email]
      );
      console.log(response);
      return res.json({
        message: "User Added Successfully",
        body: {
          user: { name, email },
        },
      });
      res.send("user created");
    },

    deleteUser: async (req, res) => {
      const { id } = req.params;
      try {
        const { rows } = await pool.query("DELETE FROM users WHERE id = $1", [
          id,
        ]);
        console.log(rows);
        res.send(`user deleted with id: ${id}`);
      } catch (error) {
        const { message } = error;
        console.log(error);
        res.send(message);
      }
    },

    updateUser: async (req, res, next) => {
      const { name, email } = req.body;
      const { id } = req.params;
      // res.send(`user updated with id: ${req.params.id}`);
      try {
        const response = await pool.query(
          "UPDATE users SET name = $1, email = $2 WHERE id = $3",
          [name, email, id]
        );

        res.send(response)
      } catch (error) {
        console.log(error);
      }
    },
  };
}

module.exports = IndexController;
