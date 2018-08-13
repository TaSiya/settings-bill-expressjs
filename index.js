let express = require('express');
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

const SettingsBill = require("./settings-bill");

const app = express();

var bill = SettingsBill();

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	let callingCost = bill.getCallCost();
	let smsingCost = bill.getSmsCost();
	let warnLevel = bill.getWarningLevel();
	let critLevel = bill.getCriticalLevel();
	var calls = bill.getCall();
	var smss = bill.getSms();
	var grandTotal = bill.getTotals();
	let colour ;
	if(bill.getTotals() >= bill.getCriticalLevel()){
		colour = 'danger';
	}
	else if (bill.getTotals() >= bill.getWarningLevel()){
		colour = 'warning';
	}
	res.render('home',{colour, calls, smss, grandTotal, callingCost, smsingCost, warnLevel, critLevel});
});

app.post("/settings", function(req, res){
	bill.setCall(parseFloat(req.body.callCost));
	bill.setSms(parseFloat(req.body.smsCost));
	bill.setWarn(parseFloat(req.body.warningLevel));
	bill.setCrit(parseFloat(req.body.criticalLevel));
	res.redirect('/');
});

app.post("/action", function(req, res){
	let value = req.body.actionType;
	bill.calculated(value);
	
	res.redirect('/');
});

app.get("/actions", function(req, res){
	res.render('actions',{stampMap : bill.gettingStamps()});
});
	
app.get("/actions/:type", function(req, res){
	let temp = req.params.type;
	bill.gettingStamps();
	res.render('actions',{stampMap : bill.filter(temp)});
});

const PORT = process.env.PORT || 3007 ;
app.listen(PORT, function(){
	console.log("Starting server @ "+ PORT);
});
