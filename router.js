const express = require("express");
const apis = require("./apis");
const router = express.Router();
const url = require('url');

/*
Front 연결 Router
*/

router.get('/',(req,res) => {
    res.render('index');
})
router.get('/signup',(req,res) => {
    res.render('signup');
})
router.get('/login', (req,res) => {
    res.render('login');
})
router.get('/survey',(req,res) => {
    res.render('survey');
})
router.get('/main',(req,res) => {
    res.render('main');
})
router.get('/board',(req,res) => {
    res.render('board');
})

/* 
API 호출 Router
*/

router.post('/apis/checkId', (req,res) => {
    return apis.checkIdOverlap(req,res);
})

router.post('/apis/register', (req,res) => {
    return apis.userRegister(req,res);
})

router.post('/apis/login', (req,res) => {
    return apis.userLogin(req,res);
})

module.exports = router;