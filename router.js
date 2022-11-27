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
    fetch('http://api.localhost:4500/apis/listBoard')
    .then(response => response.json())
    .then(response => res.render('board.ejs', {posts: response}))
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

router.get('/apis/logout', (req,res) => {
    return apis.userLogout(req,res);
})

router.get('/apis/listBoard', (req,res) => {
    return apis.listBoard(req,res);
})

router.post('/apis/postBoard', (req,res) => {
    return apis.postBoard(req,res);
})

router.get('/apis/getBoard/:id', (req,res) => {
    return apis.getBoard(req,res);
})

router.get('/apis/checkLogin', (req,res) => {
    return apis.checkLogin(req,res);
})


module.exports = router;
