const express = require('express')
const routes = require('./routes')
const port = 3000
const getVersion = require('../src/teste')
const schedule = require('node-schedule');
const getVersionOld = require('./teste')

// function compare(a,b) {
//     if (a.version > b.version)
//         return -1;
//     if (a.version < b.version)
//         return 1
//     return 0
// }

// county = county.sort(compare)

// const server = express()
// server.set('view engine', 'ejs')
// server.use(express.static('public'))
// server.use(express.urlencoded({ extended: true }))
// server.use(express.json())
// server.use(routes)

// server.locals.county = county

// server.listen(port, () => console.log(`Rodando em http://localhost:${port}`))

//Run getVersion at 3:13AM
// schedule.scheduleJob('*/1 * * * *', function(){
//     getVersionOld()
//     console.log('Task Done!')
// });

const municipioteste = {
    municipio: "Santa Rosa",
    version: "1.62.4",
    date: "08/11/2022",
    url: "http://geo.santarosa.rs.gov.br",
    suporte: true,
    success: true,
    projeto: "old"
  }

getVersion(municipioteste)

