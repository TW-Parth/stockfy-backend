const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth.route');
const multer = require('multer');
const { extendReqMiddleware } = require('./src/middleware/extendReq.middleware');

const PORT = 5000;

const app = express();

app.use(multer().any());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(extendReqMiddleware);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
