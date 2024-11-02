// importing express
// const express = require('express'); -- another way to import express
import express from 'express';  
import bodyParser from 'body-parser';

//getting instance of express --- creating express app
const app = express();

/*parses body of any request coming to all routes in this app, 
so no need to parse seperately at every callback mthd*/
app.use(bodyParser.json());

/*if some one is requesting to our server on root path this API is hit and 
the callback fn given is called*/
app.all('/', (req,res) => {
    console.log(`request > ${req}`);
    console.log(`response > ${res}`);
    res.send(`iam up`); //if we hit localhost:5111 we get this response
})


const todos = [{
    id:1,task:'task1',status:'pending'
},{
    id:2,task:'task2',status:'initiated'
}]

//read
app.get('/todos',(req,res) => {
    res.json(todos);
})

//create
app.post('/todos',(req,res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).json({  // see we are sending 201 status msg, and a normal txt response too
        message:'new todo added!'
    })
})

//update
app.put('/todos/:id',(req,res) => {
    const newTodoData = req.body;
    const TodoId = Number(req.params.id);
    const TodoIndex = todos.findIndex(td => td.id === TodoId);
    
    if(TodoIndex !== -1){
        todos[TodoIndex] = {
                            id:TodoId,
                            ...newTodoData
                            }
        res.json({
        message:"todo updated successfully!"
        })
    }else {
        res.status(400).json({
            message:"ur todo id is not valid"
        })
    }
    
})

//delete
app.delete('/todos/:id',(req,res) => {
    const TodoId = Number(req.params.id);
    const TodoIndex = todos.findIndex(td => td.id === TodoId);
    
    if(TodoIndex !== -1){
        todos.splice(TodoIndex,1);
    }

    res.json({
        message:'todo deleted successfully'
    })
})

//listening to a server and starting a server
const PORT = 5111;
app.listen(PORT,() => {
    console.log(`server has started at port ${PORT}`)
})