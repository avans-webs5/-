var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerJSDoc = require('swagger-jsdoc');
var exphbs = require("express-handlebars");

var app = express();

var cors = require('cors');
app.use(cors());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// passport
    var passport = require('passport')
    app.use(passport.initialize());
    app.use(passport.session());

// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

// HBS Setup
    app.engine('hbs', exphbs({
      defaultLayout: 'admin',
      extname: '.hbs',
      partialsDir: 'views/partials/',
      layoutsDir: 'views/layouts/',
    }));

   

// swagger definition
    var swaggerDefinition = {
      info: {
        title: 'Meetstudent API swagger docs',
        version: '1.0.0',
        description: 'Matching for students',
      },
      host: 'localhost:3000',
      basePath: '/',
    };
    // options for the swagger docs
    var options = {
      // import swaggerDefinitions
      swaggerDefinition: swaggerDefinition,
      // path to the API docs
      apis: ['./**/routes/*.js','routes.js', './models/*.js'],// pass all in array 
      };
    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);


// Data access layer
    var mongoose = require('mongoose');
    var connectionString = process.env.mongodb || 'mongodb://localhost:27017/meetstudent';
    mongoose.connect(connectionString, { useNewUrlParser: true });


// Models
    require("./models/match");
    require("./models/role");
    require("./models/user");
    require("./models/seeders/fillTestData")();


require('./config/auth-config')(passport);

// Roles
    var roles = require('./config/roles-config');
    app.use(roles.middleware());

// Routes
    var indexRouter = require('./routes');
    var authRouter = require('./routes/auth');
    var usersRouter = require('./routes/users');
    var matchRouter = require('./routes/matches');
    var loginRouter = require('./routes/login');
    var adminRouter = require('./routes/admin');
    var profileRouter = require('./routes/profile');


    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/matches', matchRouter);
    app.use('/login', loginRouter);
    app.use('/admin', adminRouter);
    app.use('/profile', profileRouter);

// serve swagger 
    app.get('/swagger.json', function(req, res) {   
      res.setHeader('Content-Type', 'application/json');   
      res.send(swaggerSpec); 
    });

// catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

// error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

module.exports = app;
