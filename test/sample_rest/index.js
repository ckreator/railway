const express = require('express')
const bodyParser = require('body-parser')
const useCases = require('./core')

const app = express()

// parse application/json
app.use(bodyParser.json())

const simpleHandler = handler => (req, res) => handler(req.body, req.params)
	.then(handled => res.json(handled))
	.catch((err) => {
		console.error('WHAAT?', err)
		res.json({})
	})


app.get('/todo', simpleHandler(useCases.getTodos))
app.get('/todo/:id', simpleHandler(useCases.getTodoByID))
app.put('/todo/:id', simpleHandler(useCases.updateTodoByID))
app.post('/todo', simpleHandler(useCases.newTodo))
app.delete('/todo/:id', simpleHandler(useCases.deleteTodo))

app.listen(3000, () => {
	console.log('Started server at localhost:3000')
})
