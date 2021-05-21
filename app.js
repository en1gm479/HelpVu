const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require("./config/passport")(passport);
const flash = require('connect-flash');
const {ensureAuthenticated} = require("./config/auth")
const hosp_detail = require('./models/hosp_details');

// express app
const app = express();

//session cookies
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//use flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//connecting to mongodb
const dburl = 'mongodb+srv://helpvu:help1234@cluster0.dfauh.mongodb.net/helpvu?retryWrites=true&w=majority';
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected successfully...'))
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

app.use('/user', require('./routing/user'))

app.get('/hospital_show', (req, res) => {
    hosp_detail.find()
        .then((result) => {
            res.render('hospital_show', { user: result });
        })
        .catch((err) => {
            console.log(err)
        })

})

app.use('/hospital', require('./routing/hospital'))

app.get('/map', (req, res) => {
    res.render('map.ejs');
})

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
})

app.get('/about', (req, res) => {
    res.render('about.ejs');
})

app.get('/bed',ensureAuthenticated, (req, res) => {
    res.render('bed_reg.ejs');
})

app.get('/status', (req, res) => {
    res.render('hospitalstatus.ejs');
})

app.get('/updation', (req, res) => {
    res.render('hospital_updation.ejs');
})

app.use('', (req, res) => {
    res.render('error404.ejs')
})