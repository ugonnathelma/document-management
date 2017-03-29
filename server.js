import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './server/config/routes';

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(routes);
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Jammin on port 3000...');
});

export default app;

