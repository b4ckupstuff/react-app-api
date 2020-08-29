function reduceToSum(number) {
    let set = new Set(["11", "22", "33"]);
    if(set.has(number) || number < 10) {
        return number;
    }
    let result = 0;
    number.split("").map(e => result += parseInt(e));
    return reduceToSum(result.toString());
}

function calculateExpressionAndSoulUrgeResult(name) {
    let map = {"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8,"i":9,"j":1,"k":2,"l":3,"m":4,"n":5,"o":6,"p":7,"q":8,"r":9,"s":1,"t":2,"u":3,"v":4,"w":5,"x":6,"y":7,"z":8," ":0};
    let vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let letters = name.split("");
    let result = {
        expression: 0,
        souldUrge: 0
    };
    letters.map(e => {
        e = e.toLowerCase();
       result.expression += map[e];
       result.souldUrge += (vowels.has(e)) ? map[e] : 0;
    });
    result.expression = reduceToSum(result.expression.toString());
    result.souldUrge = reduceToSum(result.souldUrge.toString());
    return result;
}

function createCoreResult(fullName, dateOfBirth) {
    let result = {
        dateOfBirth: {},
        lifePath: {},
        expression: {},
        soulUrge: {}
    };
    let dateOfBirthArr = dateOfBirth.split("-");
    let year = dateOfBirthArr[0], month = dateOfBirthArr[1], day = dateOfBirthArr[2];
    let yearSum = reduceToSum(year), monthSum = reduceToSum(month), daySum = reduceToSum(day);
    result.dateOfBirth.value = yearSum;
    result.lifePath.value = reduceToSum(yearSum + monthSum + daySum);
    let resObj = calculateExpressionAndSoulUrgeResult(fullName);
    result.expression.value = resObj.expression;
    result.expression.class = "text-warning";
    result.soulUrge.value = resObj.souldUrge;
    return result;
}

function createChallengeResult(fullName, dateOfBirth) {
    let result = {
        first: {},
        second: {},
        third: {},
        fourth: {}
    };
    result.first.value = "7";
    result.second.value = "2";
    result.third.value = "5";
    result.fourth.value = "5";
    return result;
}

function createImportantResult(fullName, dateOfBirth) {
    let result = {
        personality: {},
        maturity: {},
        growth: {},
        effectiveness: {},
        karmic: {},
        firstLetter: {},
        firstVowel: {}
    };
    result.personality.value = "5";
    result.maturity.value = "5";
    result.growth.value = "5";
    result.effectiveness.value = "5";
    result.karmic.value = "5";
    result.firstLetter.value = "B (2)";
    result.firstVowel.value = "E (5)";
    return result;
}

function createIntensityResult(fullName, dateOfBirth) {
    let result = {};
    for(let i = 1; i < 10; i++) {
        result[i] = {};
        result[i].value = Math.round(Math.random() * 10);
    }
    result["4"].class = "text-warning";
    return result;
}

function createYearlyResult(fullName, dateOfBirth) {
    let result = [];
    let dateOfBirthArr = dateOfBirth.split("-");
    let year = parseInt(dateOfBirthArr[0]), month = parseInt(dateOfBirthArr[1]), day = parseInt(dateOfBirthArr[2]);
    for(let i = year; i < year + 101; i++) {
        let tempObj = {
            age: {
                value: i - year + 1
            },
            essence: {
                value: Math.round(Math.random() * 10)
            },
            personalYear: {
                value: (i - year) % 10
            },
            universalYear: {
                value: (i - year) % 10
            },
            year: {
                value: i
            },
            period: {
                value: (i - year) % 7
            },
            pinnacle: {
                value: (i - year) % 7
            }
        };
        result.push(tempObj);
    }
    return result;
}

function createFullResult(fullName, dateOfBirth) {
    createYearlyResult(fullName, dateOfBirth);
    return {
        core: createCoreResult(fullName, dateOfBirth),
        challenge: createChallengeResult(fullName, dateOfBirth),
        important: createImportantResult(fullName, dateOfBirth),
        intensity: createIntensityResult(fullName, dateOfBirth),
        yearly: createYearlyResult(fullName, dateOfBirth)
    };
}

module.exports = {
    createFullResult
};