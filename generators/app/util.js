'use strict'

const fs = require('fs')

module.exports = {
  getGitOrigin: function(){
    let gitOrigin = ''
    try {
      let gitConfig = fs.readFileSync('./.git/config', 'utf-8'),
        m = gitConfig.match(/\[remote\s+"origin"]\s+url\s+=\s+(\S+)\s+/i)
      if (m) {
        gitOrigin = m[1]
      }
    } finally {
      return gitOrigin
    }
  },
  getHomeUrl: function(repo){
    let url = '';
    try {
      let m = repo.match(/^git@(\S+)\.git$/i);
      if (m) {
        url = m[1].split(':').join('/');
      }
    } finally {
      return url;
    }
  },
  getAppName: function(){
    path.basename(process.cwd())
  },
  getBaseDir: function(){
    path.basename(process.cwd())
  }
}