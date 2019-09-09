const Octokit = require('@octokit/rest')

const octokit = Octokit({
      auth: '0d553a6b68d863b51ab3ea1433233eb9b6ed5587',
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
		if (repos.data[r].watching_count >= 1 || repos.data[r].stargazers_count >= 1 || repos.data[r].fork_count >= 1){
		var views = await octokit.repos.getViews({
		  'owner':'dunncreativess',
		  'repo': repos.data[r].name
		})
		console.log(views)
	}
	}
}
go()