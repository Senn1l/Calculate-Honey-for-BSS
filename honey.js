function isNumber(c) {
    return c >= '0' && c <= '9';
}

//convert a string to a number (string datatype)
function toNumberString(s) {
    let ans = "";
    for (let i = 0; i < s.length; i++) {
        if (isNumber(s[i]) || s[i] === '.') {
            ans += s[i];
        }
    }
    return ans;
}

//convert a string to double using above function
function stringToDouble(s) {
    let a = toNumberString(s);
    let c = parseFloat(a);
    return c;
}

function getAbbreviationString_FromString(s) {
    // Reverse the string
    s = s.split('').reverse().join(''); // dq33.1
    let res = "";
    let i = 0;

    // Check if the character is not a number
    while (isNaN(Number(s[i]))) {
        res += s[i].toUpperCase(); // DQ
        i++;
    }

    // Reverse the result
    res = res.split('').reverse().join(''); // QD
    return res;
}

//convert a string to double using above function
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

function getAbbreviationString_FromDoubleNumber(x) {
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

//main function
function honeyForBees(mp, bonus_bft, lvA, lvB, numberOfBeesToLevelUp) {
    /*
        mp: map
        bonus bond from treats
        lvA: init
        lvB: end
    */
    try {
        if (bonus_bft < 100 || (bonus_bft > 110 && bonus_bft < 120) || bonus_bft > 130) throw 101;
        if (checkAppropriateLevel(lvA, lvB)) throw 102;
        if (numberOfBeesToLevelUp < 0 || numberOfBeesToLevelUp > 50) throw 103;
    } catch (errorNumber) {
        if (errorNumber === 101) console.log("You didn't input the right BONUS BFT", bonus_bft);
        if (errorNumber === 102) console.log("You didn't input the right LEVEL");
        if (errorNumber === 103) console.log("You didn't input the right NUMBER OF BEES");
        console.log("\nError code: " + errorNumber);
        return;
    }

    const convertBonus_bft = 1 + bonus_bft * 0.01;
    let totalHoneyFor1 = 0;
    let abbreviation = 0;

    bftInText = bonus_bft + "%";

    const myObjectList = {
        "Level": '<p class="firstRow">Honey to upgrade with <span class="redText">' + bftInText + '</span> bft</p>',
    };

    for (const [level, honey] of Object.entries(mp)) {
        const check = stringToDouble(level);
        
        if (check >= lvA && check < lvB) {
            abbreviation = getNumber_FromAbbreviationString(getAbbreviationString_FromString(honey));
            const honeyCurrentLevel = stringToDouble(honey) / convertBonus_bft;
            totalHoneyFor1 += honeyCurrentLevel * abbreviation;

            // Insert an object to object list
            myObjectList[level] = honeyCurrentLevel.toFixed(3) + getAbbreviationString_FromString(honey);
        }
    }
    //create table by object list
    createTable(myObjectList);

    return totalHoneyFor1 * numberOfBeesToLevelUp;
}

// Function to create a table based on the object
function createTable(object) {
    // Get the table reference
    var table = document.getElementById("calculateTable");
  
    // Iterate over the object's keys and values
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        // Create a new row
        var newRow = table.insertRow();
  
        // Insert cells into the new row
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
  
        //console.log(cell1)
        //console.log(cell2)

        // Add data to the cells
        cell1.innerHTML = key;
        cell2.innerHTML = object[key];
      }
    }
}

const lv_Bond = {
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

function processTest(bonus_bft, lvA, lvB, number) {
    //honeyForBees create new table
    const hfbs = honeyForBees(lv_Bond, bonus_bft, lvA, lvB, number);
    if (hfbs === -1) {
        console.log("ERROR")
    }

    const a = getAbbreviationString_FromDoubleNumber(hfbs);
    const b = getNumber_FromAbbreviationString(a);

    //get element
    log1 = document.getElementById("consoleLogHoneyNeeded");

    //update element
    log1.innerHTML = `You will need -->${(hfbs/b).toFixed(3)}${a}<-- HONEY
    in order to LEVEL UP ${number}${(number === 1 ? " bee" : " bees")} 
    FROM LEVEL ${lvA} TO LEVEL ${lvB} with ${bonus_bft}% bft`
}