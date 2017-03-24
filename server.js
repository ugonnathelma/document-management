import express from 'express';

const app = express();
const bodyParser = require('body-parser');
const routes = require('./server/config/routes');

require('dotenv').config();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(routes);

app.listen(port);
console.log('Jammin on port 3000...');

export default app;

