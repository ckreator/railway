const isString = s => typeof s === 'string'

const validateID = ({ id }) => {
	if (isString(id) && id.length > 0) {
		return id
	}
	throw new Error(`InvalidID. Got: ${id}`)
}

const skipBody = (_, params) => params

const formatter = (key) => {
	const successMessage = data => ({ success: true, [key]: data })
	const failureMessage = error => ({ success: false, error: error.message })
	// const failureMessage = err => ({ message: `Failed to run pipeline due to "${err.message}"` })
	return [successMessage, failureMessage]
}

const STATUS = new Map([
	['TODO'],
	['DONE']
])

const InvalidStatus = () => new Error('InvalidStatus')
const isStatus = status => STATUS.has(status)

const InvalidTask = () => new Error('InvalidTask')
const isValidTask = task => isString(task) && task.length > 0 && task.length < 200

const validateTodo = (todo) => {
	if (!isStatus(todo.status)) {
		throw InvalidStatus()
	}
	if (!isValidTask(todo.task)) {
		throw InvalidTask()
	}
	return todo
}

module.exports = {
	validateID,
	validateTodo,
	skipBody,
	formatter
}
