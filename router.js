const express = require("express");
const apis = require("./apis");
const router = express.Router();
const url = require('url');

router.get('/',(req,res) => {
    res.render('index');
})

router.get('/test',(req,res) => {
    return res.json({
        success:true
    })
})

router.post('/checkId', (req,res) => {
    let result = apis.checkIdOverlap(req,res);
    if(result.success) res.render('') // ID 중복 X
    else res.render('') // ID 중복
})

router.post('/register', (req,res) => {
    return apis.userRegister(req,res);
})

router.post('/login', (req,res) => {
    return apis.userLogin(req,res);
})

module.exports = router;