const lv_honey = {
    "lv01": "10k",
    "lv02": "40k",
    "lv03": "200k",
    "lv04": "750k",
    "lv05": "4m",
    "lv06": "15m",
    "lv07": "60m",
    "lv08": "270m",
    "lv09": "450m",
    "lv10": "1.2b",
    "lv11": "2b",
    "lv12": "4b",
    "lv13": "7b",
    "lv14": "15b",
    "lv15": "120b",
    "lv16": "450b",
    "lv17": "1.9t",
    "lv18": "7.5t",
    "lv19": "15t",
    "lv20": "475t",
    "lv21": "4.5qd",
    "lv22": "95qd",
    "lv23": "5qn",
    "lv24": "95qn"
};

//check if a character is a number character
function isNumber(c) {
    return c >= '0' && c <= '9';
}

//convert a string to a number string ("1.23qd" -> "1.23")
function toNumberString(s) {
    let ans = "";
    for (let i = 0; i < s.length; i++) {
        if (isNumber(s[i]) || s[i] === '.') {
            ans += s[i];
        }
    }
    return ans;
}

//convert a string to float ("1.23" -> 1.23)
function stringToFloat(s) {
    let a = toNumberString(s);
    let c = parseFloat(a);
    return c;
}

//convert a number string to abbreviation: "1.33qd" -> QD
function getAbbreviationString_FromNumberString(s) {
    // Reverse the string
    s = s.split('').reverse().join(''); // "dq33.1"
    let res = "";
    let i = 0;

    // Run while character is not a number
    while (isNaN(Number(s[i]))) {
        res += s[i].toUpperCase(); // "DQ"
        i++;
    }

    // Reverse the result
    res = res.split('').reverse().join(''); // "QD"
    return res;
}

//convert certain abbreviation strings to double
function getNumber_FromAbbreviationString(s) {
    if (s === "SX") {
        return 1e21;
    }
    if (s === "QN") {
        return 1e18;
    }
    if (s === "QD") {
        return 1e15;
    }
    if (s === "T") {
        return 1e12;
    }
    if (s === "B") {
        return 1e9;
    }
    if (s === "M") {
        return 1e6;
    }
    else {
        return 1e3;
    }
}

//convert certain abbreviation strings to double
function getAbbreviationString_FromFloatNumber(x) {
    if (x >= 1e21) {
        return "SX";
    }
    if (x >= 1e18) {
        return "QN";
    }
    if (x >= 1e15) {
        return "QD";
    }
    if (x >= 1e12) {
        return "T";
    }
    if (x >= 1e9) {
        return "B";
    }
    if (x >= 1e6) {
        return "M";
    }
    else {
        return "K";
    }
}

function checkAppropriateLevel(a, b) {
    return (a >= b || (a <= 0 || a > 25) || (b < 0 || b > 25));
}