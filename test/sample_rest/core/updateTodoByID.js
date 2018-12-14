const Storage = require('../storage')
const railway = require('../../..')

const { validateTodo, validateID } = require('./shared')

const buildTodo = async (body, params) => {
	const id = await validateID(params)
	const todo = await validateTodo(body)
	return { ...todo, id }
}

const updateTodoByID = railway(
	buildTodo,
	Storage.updateTodo
)


module.exports = updateTodoByID
