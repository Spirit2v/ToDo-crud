const express  = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
require ('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = 'mongodb+srv://suyash:suyash@cluster0.tgoeo.mongodb.net/Suyash?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

  

app.listen(port,()=>{
    console.log('Server is running  ')
});