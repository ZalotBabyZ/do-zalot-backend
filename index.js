require('dotenv').config();
require('./middleware/passport');

const express = require('express');
const cors = require('cors');
const db = require('./models');

const UserRoute = require('./routes/user');
const ProjectRoute = require('./routes/project');
const TodoRoute = require('./routes/todo');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/users', UserRoute);
app.use('/projects', ProjectRoute);
app.use('/todos', TodoRoute);

app.use((req, res, next) => {
  res.status(404).send({ message: 'path not found on this server' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

db.sequelize.sync({ force: false }).then(() => {
  console.log('Completed Connect And Sync');
});
