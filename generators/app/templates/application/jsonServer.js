'use strict'

const jsonServer = require('json-server')
const db = require('./src/js/mock/db')
const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, function () {
    console.log('JSON Server is running')
})
