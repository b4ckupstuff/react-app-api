function createCoreResult(fullName, dateOfBirth) {
    let result = {
        dateOfBirth: {},
        lifePath: {},
        expression: {},
        soulUrge: {}
    };
    let dateOfBirthArr = dateOfBirth.split("-");
    let year = dateOfBirthArr[0], month = dateOfBirthArr[1], day = dateOfBirthArr[2];
    let yearSum = 0, monthSum = 0, daySum = 0;
    year.split("").map(e => yearSum += parseInt(e));
    month.split("").map(e => monthSum += parseInt(e));
    day.split("").map(e => daySum += parseInt(e));
    result.dateOfBirth.value = yearSum;
    result.lifePath.value = yearSum + monthSum + daySum;
    result.expression.value = "11/2";
    result.expression.class = "text-warning";
    result.soulUrge.value = "6";
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