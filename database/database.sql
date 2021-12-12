CREATE DATABASE firstapi /*jj*/

CREATE TABLE users(
    id SERIAL PRIMARY KEY, -- Crea un id numerico para cada nuevo ususario (1,2,3...n)
    name VARCHAR(40), -- El nombre de ususario no supere los 40 caracteres
    email TEXT -- El email es de tipo texto
);

--aqui se inseta un usuario en la tabla que se creo arriba, esto es como una funcion que recibe parametros despues de INSET INTO users, y los argumentos serian los valores (VALUES) de los parametros luego de VALUES que se ponen dentro de parentesis
INSERT INTO users (name, email) VALUES
    ('joe', 'joe@iom.com'),
    ('ryan', 'ryan@faztweb.com');

-- para ver los datos ingresados teclea: select * from users;d