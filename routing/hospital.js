const express = require('express')
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('../views/hospital_login')
})

module.exports = router;