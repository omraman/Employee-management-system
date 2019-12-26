var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('./config');
mongoose.set('useNewUrlParser', true);


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var api = require('./app/routes/api')(app, express);
app.use('/api', api);


app.get('/', (req, res) =>{
	res.send("Hello World");
});

app.listen(config.port, (err) => {
	if(err){
		res.send(err);
	}else{
		console.log("Epress server is running on the Port 3000");
	}
});

mongoose.connect(config.database, (err) =>{
	if(err){
		res.send(err);
	}else{
		console.log("Connected to database successfully");
	}
});
