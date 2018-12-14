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
const validateStatus = status => (isStatus(status) ? status : Promise.reject(InvalidStatus()))

const InvalidTask = () => new Error('InvalidTask')
const isValidTask = task => isString(task) && task.length > 0 && task.length < 200
const validateTask = task => (isValidTask(task) ? task : Promise.reject(InvalidTask()))

const validateTodo = todo => validateStatus(todo.status) && validateTask(todo.task) && todo

module.exports = {
	validateID,
	validateTodo,
	skipBody,
	formatter
}
