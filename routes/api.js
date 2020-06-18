var express = require('express');
var router = express.Router();
const rateLimit = require("express-rate-limit");
let data = require('./data/json data');

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

router.get('/giveMeData', function (req, res) {
    res.json(data);
});

router.get('/levelUno', function (req, res) {
    res.json(Object.keys(data));
});

router.get('/levelDuos/:parent', function (req, res) {
    res.json(Object.keys(data[req.params.parent]));
});

router.get('/levelTres/:grandparent/:parent', function (req, res) {
    res.json(Object.keys(data[req.params.grandparent][req.params.parent]));
});

router.get('/levelQuatro/:greatgrandparent/:grandparent/:parent', function (req, res) {
    let result = data[req.params.greatgrandparent][req.params.grandparent][req.params.parent];
    if(typeof result === "string") {
        res.json([]);
        return;
    }
    res.json(Object.keys(result));
});

module.exports = router;
