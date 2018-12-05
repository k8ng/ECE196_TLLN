var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose	= require('mongoose'),
	app         = express();

var indexRoutes = require('./routes/index'),
	apiRoutes = require('./routes/api');

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds225624.mlab.com:25624/ece196_tlln');
mongoose.promise = Promise;

// ROUTES
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

app.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));
