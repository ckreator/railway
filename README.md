# Railway - railway-oriented JS

Railway-oriented programming is a powerful tool in handling both happy and unhappy paths. It's usually based on Some "Result" Algebraic type and pattern matching (both are missing in JS) and streamlines logic into one "happy" path and one "unhappy" path while keeping functions small and composable.

Of course, in JS the closest to the "Result" type you have built-in is the Promise. You can do Railway oriented programming very well with promises. However, I end up having some IO functions that return Promises and some other pure ones that transform data or do something meaningful. So I want this library to help me do both, but in a way that I can compose functions and handle errors in a way as if I all parts of the "pipe" return promises

Example:

```js
const todos = []

const DEFAULT_MESSAGE = 'Failed assertion'

const assert = (validator, message = DEFAULT_MESSAGE) => (data) => {
  if (!validator(data)) {
    throw new Error(message)
  }
  return data
}

const taskIsString = assert(
  ({ task }) => typeof task === 'string',
  'task should be a string'
)
const isNotTooLong = assert(
  ({ task }) => task.length > 0 && task.length <= 120,
  'task should be between 1 and 120 characters'
)
const isValidTask = todo => taskIsString(todo) && isNotTooLong(todo)

// sync functions
const validateTodo = todo => isValidTask(todo)
const traceSaved = (saved) => { console.log('Saved todo', saved); return saved }
const respondSuccess = saved => ({ success: true, saved })
const respondFailure = error => ({ success: false, error: error.message })

// async functions
const saveTodo = async (todo) => {
  const id = todos.push(todo)
  return { ...todo, id }
}

// handles Request that creates a todo for a user
const createTodo = railway(
  validateTodo, // falls through
  saveTodo, // falls through
  traceSaved, // falls through
  [respondSuccess, respondFailure],
)

const createTodoThrowing = railway(
  validateTodo, // falls through
  saveTodo, // falls through
  traceSaved // falls through
)

createTodo({ task: 'First task' })
  .then(console.log) // => { success: true, saved: { task: 'First task', id: 1 } }

// because these are handled by the respondFailure and respondSuccess functions
// the function result will always return something and therefore execute the 'then' handler
// (in this case though the 'error.message' part can throw if error is undefined)
createTodo({ task: 123 })
  .then(console.log) // => { success: false, error: 'task should be a string' }

// This will behave as a simple pipe function that combines both sync and async functions
// and therefore execute the catch handler
createTodoThrowing({ task: 123 })
  .catch(err => console.log(`failed "${err.message}"`)) // => failed "task should be a string"


// this means that, when used for handling requests (e.g. express.js) functions can be written this way

app.post(
  '/todo',
  (req, res) => createTodo(req.body).then(res.json)
)

```
