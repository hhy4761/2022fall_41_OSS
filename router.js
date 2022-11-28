const express = require("express");
const apis = require("./apis");
const router = express.Router();
const url = require('url');

router.get('/',(req,res) => {
    res.render('index');
})
router.get('/signup',(req,res) => {
    res.render('signup');
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
router.get('/surveyresult/:result',(req,res)=>{
    switch (req.params.result){
        case 'human':
            res.render('surveyresult/human')
            break
        case 'engineer':
            res.render('surveyresult/engineer')
            break
        case 'design':
            res.render('surveyresult/design')
            break
        case 'manage':
            res.render('surveyresult/manage')
            break
        case 'exercise':
            res.render('surveyresult/exercise')
            break
        default:
            res.render('survey');
            break
    }
})

router.get('/test',(req,res) => {
    return res.json({
        success:true
    })
})

router.post('/checkId', (req,res) => {
    return apis.checkIdOverlap(req,res);
})

router.post('/register', (req,res) => {
    return apis.userRegister(req,res);
})

router.post('/login', (req,res) => {
    return apis.userLogin(req,res);
})

module.exports = router;