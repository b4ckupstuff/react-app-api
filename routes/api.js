var express = require('express');
var router = express.Router();
const rateLimit = require("express-rate-limit");
let data = require('./data/json data');
let calculations = require('./helpers/calculations');

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

router.get('/adminData/number', function (req, res) {
    let returnObj = {};
    returnObj.headers = Object.keys(data["Number"]["dummy"]).filter(e => e !== "frequency");
    let tempData = [];
    Object.keys(data["Number"]).map(e => {
        if(e === "dummy") return;
        let obj = data["Number"][e];
        let temp = [];
        temp.push(e);
        returnObj.headers.map(ee => temp.push(obj[ee]));
        tempData.push(temp);
    });
    returnObj.data = tempData;
    returnObj.headers.unshift("Number");
    res.json(returnObj);
});

router.get('/adminData/keys/:grandparent', function (req, res) {
    let temp = data[req.params.grandparent]["dummy"];
    if(temp["frequency"]) delete temp["frequency"];
    res.json(Object.keys(temp));
});

router.get('/adminData/:grandparent/:parent', function (req, res) {
    let temp = data[req.params.grandparent][req.params.parent];
    if(temp["frequency"]) delete temp["frequency"];
    res.json(temp);
});

router.post('/bPMAVm', async function (req, res, next) {
    // process req.body => {fullName, dateOfBirth}
    let response = calculations.createFullResult(req.body.fullName, req.body.dateOfBirth);
    res.json(response);
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
    res.json(data[req.params.grandparent][req.params.parent]);
});

router.get('/levelQuatro/:greatgrandparent/:grandparent/:parent', function (req, res) {
    let result = data[req.params.greatgrandparent][req.params.grandparent][req.params.parent];
    if(typeof result === "string") {
        res.json([]);
        return;
    }
    res.json(Object.keys(result));
});

router.post('/value', function (req, res) {
    if(req.body.five) {
        data[`${req.body.one}`][`${req.body.two}`][`${req.body.three}`][`${req.body.five}`] = req.body.four;
    } else {
        data[`${req.body.one}`][`${req.body.two}`][`${req.body.three}`] = req.body.four;
    }
    res.send([]).status(200);
});

router.get('/finalValue/:one/:two/:three/:four', function (req, res) {
    let result = "";
    let one = req.params.one;
    let two = req.params.two;
    let three = req.params.three;
    let four = req.params.four;
    // let five = req.params.five;
    if(four !== "undefined") {
        result = data[`${one}`][`${two}`][`${three}`][`${four}`];
    } else {
        result = data[`${one}`][`${two}`][`${three}`];
    }
    res.json(result);
});

module.exports = router;
