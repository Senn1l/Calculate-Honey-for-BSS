//Create a table based on the object list
function createTable(object) {
    //Get the table reference
    var table = document.getElementById("honeyNeededTable");
  
    //Iterate over the object's keys and values
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            //Create a new row
            var newRow = table.insertRow();

            //Insert cells into the new row
            var cell1 = newRow.insertCell(0);
            //cell1.setAttribute("class", "firstCol");
            var cell2 = newRow.insertCell(1);

            //Add data to the cells
            cell1.innerHTML = key;
            cell2.innerHTML = object[key];
        }
    }
    //console.log(table);
}

//main function
function honeyForBees(mp, bonus_bft, lvA, lvB, numberOfBeesToLevelUp) {
    /*
        mp object list
        bonus bond from treats: range from 100 to 110 and 120 to 130
        lvA: range from 1-24
        lvB: range from 2-25
        numberOfBeesToLevelUp: range from 1 to 50
    */
    //there was a try - catch error here

    const convertBonus_bft = bonus_bft * 0.01;
    let totalHoneyFor1 = 0;
    let abbreviation = 0;

    const myObjectList = {
        '<h5 class="margin0">Level</h5>': '<h5 class="margin0">Honey to upgrade 1 bee with <span class="redText">' + bonus_bft + '%</span> bft</h5>',
    };

    //iterate using entries
    for (const [level, honey] of Object.entries(mp)) {
        const check = stringToFloat(level);
        
        if (check >= lvA && check < lvB) {
            abbreviation = getNumber_FromAbbreviationString(getAbbreviationString_FromNumberString(honey));
            const honeyCurrentLevel = stringToFloat(honey) / convertBonus_bft;
            totalHoneyFor1 += honeyCurrentLevel * abbreviation;

            // Insert an object to object list
            myObjectList[level] = honeyCurrentLevel.toFixed(3) + getAbbreviationString_FromNumberString(honey);
        }
    }
    //call function to create table
    createTable(myObjectList);

    return totalHoneyFor1 * numberOfBeesToLevelUp;
}