const todos = new Map()

// let's assume this will be async in the future
const findByID = async id => todos.get(id)

const saveTodo = async (todo) => {
	const { id } = todo
	todos.set(id, todo)
	console.log('SAVING TODO:', id, todo)
	return todo
}

const updateTodo = async (newTodo) => {
	const { id } = newTodo
	const old = await todos.get(id)
	todos.set(id, newTodo)
	return old
}

const existsByID = async id => todos.has(id)

const deleteTodo = async id => todos.delete(id)

const getAll = async () => {
	console.log('TODO LIST:', Array.from(todos))
	return Array.from(todos).map(([, todo]) => todo)
}

module.exports = {
	findByID,
	saveTodo,
	updateTodo,
	deleteTodo,
	getAll,
	existsByID
}
