const Storage = require('../storage')
const railway = require('../../..')

const { skipBody, validateID, formatter } = require('./shared')

const deleteTodo = railway(
	skipBody,
	validateID,
	Storage.deleteTodo,
	formatter('todo')
)


module.exports = deleteTodo
