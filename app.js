const Octokit = require('@octokit/rest')
var octokit;
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.listen(process.env.PORT || 13813, function() {});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.get('/', (req, res) => {
 res.render('index.ejs', {
            views: views,
            key: key,
            owner: owner
})
})
app.post('/post', (req, res) => {
	key = req.body.key
	owner = req.body.owner
	reinitialize(res, true)
 
})
var views = {}
var owner = "dunncreativess"
var key = '0e454bf741c5da308bf7016724134571d4c17ce1'
function reinitialize(res, tof){
octokit = Octokit({
      auth: key,
  baseUrl: 'https://api.github.com',
  log: {
    debug: () => {},
    info: console.log,
    warn: console.warn,
    error: console.error
  }

})

go(res, tof)

}
async function go(res, tof){
	try{
	var repos = await octokit.repos.list()
	for (var r in repos.data){
try{
		var vs = await octokit.repos.getViews({
		  'owner':owner,
		  'repo': repos.data[r].name
		})
		for(var v in vs.data.views){
			if (views[repos.data[r].name] == undefined){
				views[repos.data[r].name] = []
			}
			views[repos.data[r].name].push(vs.data.views[v])
		}
	}
	catch (err){
		console.log(err)
	}
	}
}
catch(err){
	console.log(err)
	setTimeout(function(){
		go()
	},4000)
}
if (tof){
	res.render('index.ejs', {
            views: views,
            key: key,
            owner: owner
})
}
}
reinitialize()