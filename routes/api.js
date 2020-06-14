var express = require('express');
var router = express.Router();
const rateLimit = require("express-rate-limit");

const requestHashKey = (req) => {
    return req.headers['x-forwarded-for'];
};

const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 1,
    message: "Too many requests",
    keyGenerator : requestHashKey
});

router.get('/', function(req, res, next) {
    res.send("Hello World");
});

router.get('/rate-limit-test', limiter, function(req, res, next) {
    res.send("200 ok");
});

async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

router.post('/bPMAVm', limiter, async function (req, res, next) {
    // process req.body => {fullName, dateOfBirth}
    res.json("result");
});

module.exports = router;
