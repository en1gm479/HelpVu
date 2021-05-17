const express = require('express')

// express app
const app = express();

//middlewares
app.use(express.static('public'));

//set view engine
app.set('view engine', 'ejs');

//listening for req
app.listen(3000,()=>{
    console.log(`Server started at http://127.0.0.1:3000/`);
});

//routing
app.get('/', (req, res) => {
    res.render('index')
  });