
const express = require('express');
const mongoose = require('mongoose')

const usersRouter = require('./routes/users');

var app = express();
const PORT = 3000

// We need to store the following in .env 
const DB_PASSWORD = 'password'
const DB_PORT = '27017'

const DB  = `mongodb://root:password@localhost:${DB_PORT}/`;
mongoose.connect(DB).then(() => {
  console.log(`Database connected`)
}).catch(err => console.log(`Error occured ${err}`))

app.use(express.json());
const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString();
  const endpoint = req.originalUrl;

  console.log(`[${timestamp}] Requested endpoint: ${endpoint}`);
  next();
}
app.use(logger);

app.use(express.urlencoded({ extended: false }));

app.use('/api/users', usersRouter)

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is healthy' })
})

app.listen(PORT, () => { console.log(`listening and serving on port ${PORT}`) })
