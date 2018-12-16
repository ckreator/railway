# Railway - railway-oriented JS

Railway-oriented programming is a powerful tool in handling both happy and unhappy paths. It's usually based on Some "Result" Algebraic type and pattern matching (both are missing in JS) and streamlines logic into one "happy" path and one "unhappy" path while keeping functions small and composable.

Of course, in JS the closest to the "Result" type you have built-in is the Promise. You can do Railway oriented programming very well with promises. However, I end up having some IO functions that return Promises and some other pure ones that transform data or do something meaningful. So I want this library to help me do both, but in a way that I can compose functions and handle errors in a way as if I all parts of the "pipe" return promises

Example:

```js
// sync functions
const validateTodo = ({task}) => typeof task === 'string' && task.length <= 120
const traceSaved = saved => { console.log('Saved todo', saved); return saved }

// async functions
const respondSuccess = async ({saved}) => ({success: true, saved})
const respondFailure = async ({error}) => ({
  success: false, error
})

// handles Request that creates a todo for a user
const createTodo = railway(
  validateTodo, // falls through
  saveTodo, // falls through
  traceSaved, // falls through
  [respondSuccess, respondFailure],
)

const routeHandler = async (req, res) => {
  const response = await createTodo(req.body)
  res.json(response)
}

```
