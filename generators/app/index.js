'use strict'

const yeoman = require('yeoman-generator')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const yosay = require('yosay')
const _ = require('lodash')
const extend = require('deep-extend')
const mkdirp = require('mkdirp')
const selfupdate = require('selfupdate')
const packageJSON = require('../../package.json')
const notifier = require('node-notifier')
const util = require('./util')


module.exports = yeoman.Base.extend({
  
  initializing() {
    this.props = {}

    //tip for update this generator
    try{
      selfupdate.isUpdated(packageJSON, (error, isUpdated) => {
        if (error) throw error
        if (isUpdated) return
    
        notifier.notify({
          title: 'generator-swordsman',
          subtitle: '已有新版本,正在更新...',
          message: '如果更新失败，请手动更新\n执行 npm i -g generator-swordsman',
          contentImage: path.resolve(__dirname, 'peon.gif'),
          sound: true,
          wait: true
        })
    
        selfupdate.update(packageJSON, (error, version) => {
          if (error) throw error
          notifier.notify({
            title: 'generator-swordsman',
            subtitle: '更新完毕',
            message: '请重新运行本应用\n执行 yo swordsman',
            contentImage: path.resolve(__dirname, 'peon.gif'),
            sound: true,
            wait: true
          })
        })
      })
    } catch(ex) {
      console.log(ex)
    }
    
  },

  prompting() {
    const prompts = require('./prompts')(this)
    const done = this.async()
    this.prompt(prompts, (props) => {
      this.props = props
      done()
    })
  },

  //license
  default: function () {
    this.composeWith('license', {
      options: {
        name: this.props.author,
        email: this.props.email,
        website: ''
      }
    }, {
      local: require.resolve('generator-license/app')
    })
  },
  
  writing: {
    'init': function () {
      this.currentTemplatePath = this.templatePath(this.props.boilerplate)  //当前用户选择的模板路径
    },
    
    'package_json': function () {
      const currentPkg = this.fs.readJSON(path.join(this.currentTemplatePath, 'package.json'), {})
      this.pkg = extend(currentPkg, {
        name: this.props.name,
        version: this.props.version,
        description: this.props.description,
        repository: {
          type: 'git',
          url: this.props.repo
        },
        author: {
          name: this.props.author,
          email: this.props.email
        },
        keywords: [],
        bugs: {
          url: 'http://' + util.getHomeUrl(this.props.repo) + '/issues'
        },
        homepage: 'http://' + util.getHomeUrl(this.props.repo)
      })
      if (this.props.keywords) {
        this.pkg.keywords = _.uniq(this.props.keywords.concat(this.pkg.keywords))
      }
      
      this.fs.writeJSON(this.destinationPath('package.json'), this.pkg)
    },
    
    'cortex_json': function () {
      const currentCortex = this.fs.readJSON(path.join(this.currentTemplatePath, 'cortex.json'), {})
      const cortex = extend({
        name: this.pkg.name,
        version: this.pkg.version,
        description: this.pkg.description,
        main: 'index.js',
        directories: {
          src: 'dist',
          html: 'html'
        },
        repository: this.pkg.repository,
        author: this.pkg.author,
        license: this.pkg.license,
        keywords: this.pkg.keywords,
        bugs: this.pkg.bugs,
        homepage: this.pkg.homepage
      }, currentCortex)

      this.fs.writeJSON(this.destinationPath('cortex.json'), cortex)
    },

    //copy template files
    'directories': function (){
      chalk.red('directories')
      this.fs.copy(path.join(this.currentTemplatePath, '/**/*.*'), this.destinationPath('./'))
      this.fs.copy(path.join(this.currentTemplatePath, '/**/.*'), this.destinationPath('./'))
    }
  },

  'install': function () {
    let opt = {
      cwd: this.destinationPath('./')
    }
    this.spawnCommandSync('cortex', ['install'], opt)
    this.spawnCommandSync('npm', ['install'], opt)
    this.spawnCommandSync('webpack', [], opt)
    this.spawnCommandSync('npm', ['start'], opt)
  }
})
