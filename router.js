const express = require("express");
const apis = require("./apis");
const router = express.Router();
const url = require('url');

router.get('/',(req,res) => {
    res.render('index');
})

module.exports = router;