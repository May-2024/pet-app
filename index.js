const express = require('express');
const { trace } = require('joi');
const app = express();
const port = 3000;
const sequelize =require('./db/sequelize')
const routerApi = require ('./routes');

const{logErrors,errorHandler, boomErrorHandler,ormErrorHandler} =require('./middlewares/error.handler');


app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome to my API');
});

app.listen(port, () => {
  console.log('Mi port' + port);
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


routerApi(app);