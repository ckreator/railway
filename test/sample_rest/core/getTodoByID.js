const Storage = require('../storage')
const railway = require('../../..')

const { skipBody, validateID, formatter } = require('./shared')

const getTodoByID = railway(
	skipBody,
	validateID,
	Storage.findByID,
	formatter('todo')
)


module.exports = getTodoByID
