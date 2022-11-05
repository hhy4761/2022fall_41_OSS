const express = require("express");
const apis = require("./apis");
const router = express.Router();
const url = require('url');

router.get('/',(req,res) => {
    res.send('서버 실행 중');
})

module.exports = router;