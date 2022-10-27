const express = require('express');
// rotas
const routeUser = require('./routes/userRoute');
const routeLogin = require('./routes/loginRoute');

const app = express();

app.use(express.json());

app.use(routeUser);
app.use(routeLogin);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
