const router = require ('express').Router()
var TodoModel = require('../models/TodoModel');

router.get('/',(req,res)=>{
TodoModel.find()
.then(todo=>res.json(todo))
.catch(err=>res.status(400).json('Error'+err))
})

router.post('/add',(req,res)=>{
    const todo = req.body.todo;
    const newTodo = new TodoModel({
        todo
    })
    newTodo.save()
    .then(()=>{
        res.json('Todo added')
    })
    .catch(err=>res.status(400).json('Error'+err));


})

router.delete('/del/:id',(req,res)=>{
    TodoModel.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Todo Deleted'))
    .catch(err=>res.status(400).json('Error'+err))
})
module.exports=router;