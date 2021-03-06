var CoreObject  = require('core-object');
var Promise     = require('ember-cli/lib/ext/promise');
var gitRepoInfo = require('git-repo-info');
var simpleGit = require('simple-git');

module.exports = CoreObject.extend({
  init: function(path) {
    this.path = path;
  },

  generate: function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
      simpleGit(_this.path).log(function(err, log) {
        var info = log.latest;
        resolve({
          sha: info.hash.replace("'",''),
          email: info.author_email.replace("'",''),
          name: info.author_name,
          timestamp: new Date(info.date).toISOString(),
          branch: gitRepoInfo().branch,
          tag: gitRepoInfo().tag
        });
      });
    });
  }
});
