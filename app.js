const Octokit = require('@octokit/rest')
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.listen(5000, function() {});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.get('/', (req, res) => {
 res.render('index.ejs', {
            views: views,
            key: key
})
})
app.post('/', (req, res) => {
	key = req.body.key
	reinitialize()
 res.render('index.ejs', {
            views: views,
            key: key
})
})
var views = {}
var key = '6f186a4a216e10a47880b99470116cae349239c8'
function reinitialize(){
const octokit = Octokit({
      auth: key,
  baseUrl: 'https://api.github.com',
  log: {
    debug: () => {},
    info: console.log,
    warn: console.warn,
    error: console.error
  }

})
async function go(){
	var repos = await octokit.repos.list()
	for (var r in repos.data){
try{
		var vs = await octokit.repos.getViews({
		  'owner':'dunncreativess',
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
go()
}
reinitialize()