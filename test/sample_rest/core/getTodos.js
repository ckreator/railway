const Storage = require('../storage')
const railway = require('../../..')
const { formatter } = require('./shared')

const getTodos = railway(Storage.getAll, formatter('todos'))

module.exports = getTodos
