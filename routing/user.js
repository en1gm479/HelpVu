const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const users = require('../models/users')
const bcrypt = require('bcryptjs');


router.get('/login', (req, res) => {
    res.render('../views/login')
})

router.get('/register', (req, res) => {
    res.render('../views/register')
})

router.post('/register', (req, res) => {
    const { name, email, num, password, password2 } = req.body;

    const err = [];
    if (!name || !email || !num || !password || !password2) {
        err.push({ msg: 'Please fill in all the fields.' });
    }
    if (password !== password2) {
        err.push({ msg: 'Password do not match.' });
    }
    if (password.length < 6) {
        err.push({ msg: 'Password should be atleast 6 character long.' });
    }

    if (err.length > 0) {
        res.render('../views/register', { err })
    }
    else {
        users.findOne({ num: num })
            .then(user => {
                if (user) {
                    err.push({ msg: 'Phone Number already exist' })
                    res.render('../views/register')
                }
                else {
                    const newUser = new users({
                        name,
                        email,
                        num,
                        password
                    });
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    res.redirect('/user/login');

                                })
                        })
                    );

                }
            })
    }
});

router.post('/login', (req, res) => {
    const { num, password } = req.body;
    err = [];
    users.findOne({num:num})
        .then(user =>{
            if(user){
                bcrypt.compare(password, user.password, function(err, data) {
                    // if(error) throw error;
                    if(data){
                        res.send("login successful");
                    }else{
                       // err.push({ msg: 'Password does not matches' })
                        res.render('../views/login')
                    }

                });
            }
            else{
               // err.push({ msg: 'Phone Number is not registered' })
                    res.render('../views/login')
            }
        })

});

module.exports = router;