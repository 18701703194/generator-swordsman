## generator-swordsman

### Introduce
react + redux + recompose + ES6(babel) + webpack 技术栈,支持IE8
json-server 接口mock

### Usage
```
npm i -g generator-swordsman
npm i -g yeoman
yo
```
选择 generator-swordsman 脚手架, 接着选择component或application模板, 再按提示进行项目配置
配置好后,会自动安装npm和cortex依赖,安装完成后会执行`npm start`命令,会启动webpack-dev-server和json-server

关于json-server的使用可以参阅https://github.com/typicode/json-server,计划在@gfe/bp-entertainment-api自动切换

### Remarks
1. component 不会进行babel编译,直接暴露源码,在application中@gfe的npm包都会过babel编译
2. 在eslint-plugin-react的基础上配置了下eslint,eslint-plugin-react对编写react的代码规范和性能优化有些帮助,但真的很繁琐,默认配置项是注释了,需要自己改下webpack