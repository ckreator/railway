const uuidV4 = require('uuid/v4')

const Storage = require('../storage')
const railway = require('../../..')
const { formatter, validateTodo } = require('./shared')

const addID = todo => ({ ...todo, id: uuidV4() })

const newTodo = railway(
	addID,
	validateTodo,
	Storage.saveTodo,
	formatter('created')
)

module.exports = newTodo
