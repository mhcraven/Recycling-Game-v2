Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('leaderboard', {path: '/'});
});