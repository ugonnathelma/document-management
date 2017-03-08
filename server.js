const express = require('express'), app = express();
const bodyParser = require('body-parser');
const routes = require('./server/config/routes');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(routes);

app.listen(port);
console.log('Jammin on port 3000...');

