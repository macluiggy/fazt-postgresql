var express = require("express");
var app = express();
//middlewares, para que node funcione bien
app.use(express.json()); //para que node entienda el formato json
app.use(express.urlencoded({extended: false})); //para que node entienda los datos de un formulario, el argumento que contiene es para decirle que solo va a recibir datos simples
// routes
app.use(require("./routes/index"));

let port = 3000;
app.listen(port, () => console.log(`Server on post ${port}`));
