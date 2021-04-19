const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');


const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const store =  new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 10 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 2 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
})
const sess = {
  secret: 'bigolSecret we got here',
  store,
  // cookie: { maxAge: null },
  resave: false,
  saveUninitialized: false
};

app.use(session(sess));
store.sync({ force: false })
const helpers = require('./utils/helpers');


const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/'));

store.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});