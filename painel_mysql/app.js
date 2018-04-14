/**
* Module dependencies.
*/
var express    = require('express')
  , routes 	   = require('./routes')
  , user 	   = require('./controllers/user')
  , config 	   = require('./config')
  , http 	   = require('http')
  , path 	   = require('path')
  , session    = require('express-session')
  , app 	   = express()
  , mysql      = require('mysql')
  , bodyParser = require('body-parser');

// connection mysql
var env = app.get('env') == 'development' ? 'local' : app.get('env');
var connection = mysql.createConnection(config(env).mysql);
connection.connect(); 
global.db = connection;

// all environments
app.set('port', config().port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
		  secret: 'keyboard cat',
		  resave: false,
		  saveUninitialized: true,
		  cookie: { maxAge: 60000 }
		}))
 
// development only 
app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile

// middleware
app.listen(config().port)
