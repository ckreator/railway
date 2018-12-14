// import handlers
const getTodos = require('./getTodos')
const deleteTodo = require('./deleteTodo')
const newTodo = require('./newTodo')
const updateTodoByID = require('./updateTodoByID')
const getTodoByID = require('./getTodoByID')

module.exports = {
	deleteTodo,
	newTodo,
	updateTodoByID,
	getTodoByID,
	getTodos
}
