const express = require('express');
// rotas
const routeUser = require('./routes/userRoute');
const routeLogin = require('./routes/loginRoute');
const routeCategories = require('./routes/categoriesRoute');
const routePost = require('./routes/post');

const app = express();

app.use(express.json());

app.use(routeUser);
app.use(routeLogin);
app.use(routeCategories);
app.use(routePost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
