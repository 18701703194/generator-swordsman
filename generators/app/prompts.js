'use strict'

const path = require('path')
const util = require('./util')

module.exports = function (self){
  
  return [
    {
      name: 'boilerplate',
      type: 'list',
      choices: ['application', 'component'],
      default: 'application',
      message: 'boilerplate'
    },
    {
      type: 'input',
      name: 'name',
      message: 'Please choose your application name',
      default: path.basename(process.cwd())
    },
    {
      name: 'version',
      default: '0.1.0',
      message: 'version'
    },
    {
      name: 'description',
      default: 'gfe swordsman project',
      message: 'description'
    },
    {
      name: 'repo',
      default: util.getGitOrigin(),
      message: 'git repository'
    },
    {
      name: 'keywords',
      default: 'gfe swordsman project',
      message: 'keywords',
      filter: function (words) {
      return words.split(/\s*,\s*/g);
    }
    },
    {
      name: 'author',
      default: self.user.git.name(),
      message: 'author'
    },
    {
      name: 'email',
      default: self.user.git.email(),
      message: 'E-Mail'
    }
  ]
}
