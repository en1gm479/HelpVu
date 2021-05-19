const express = require('express')
let ejs = require('ejs');
const mongoose = require('mongoose')
const hosp_detail = require('./models/hosp_details')

// express app
const app = express();

//connecting to mongodb
const dburl = 'mongodb+srv://helpvu:help1234@cluster0.dfauh.mongodb.net/helpvu?retryWrites=true&w=majority';
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('DB connected successfully...'))
    .catch((err) => console.log(err));

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set('view engine', 'ejs');

//listening for req
app.listen(3000, () => {
    console.log(`Server started at http://127.0.0.1:3000/`);
});

//routing
app.get('/', (req, res) => {
    res.render('index')
});

app.use('/user',require('./routing/user'))

app.get('/hospital_show',(req,res)=>{
    hosp_detail.find()
      .then((result) =>{
          res.render('hospital_show',{user : result});
      })
      .catch((err)=>{
          console.log(err)
      })

})

app.use('/hospital',require('./routing/hospital'))

app.get('/map',(req,res)=>{
res.render('map.ejs');
})

app.get('/bed',(req,res)=>{
    res.render('bed_reg.ejs');
})


app.use('',(req,res)=>{
res.send('404! File not Found')
})