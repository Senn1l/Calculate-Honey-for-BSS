function recreateElementBasedOnId(id_attribute, tagName) {
    //1. remove exist element
    var oldElement = document.getElementById(id_attribute);

    if (oldElement) {
        //Get the parent of the table (in this case a div)
        var parent = oldElement.parentNode;

        //Remove the element from its parent
        parent.removeChild(oldElement);
    } else {
        //console.log("Element not found.");
    }

    //2. create new one and set old id to it again
    var newElement = document.createElement(tagName);
    newElement.setAttribute("id", id_attribute);
    newElement.setAttribute("class", "margin0");

    //3. Get the div element by its id and append new element to it
    var toBeInserted_div = document.getElementById("toBeInserted");
    toBeInserted_div.append(newElement);
}

function submit() {
    //1. Recreate elements
    recreateElementBasedOnId("totalHoneyRequired", "p");
    recreateElementBasedOnId("honeyNeededTable", "table");
    recreateElementBasedOnId("placeHolder", "p")
    
    //2. Get Inputs and check
    var bonus_bft = stringToFloat(document.getElementById('bft').value);
    var lvA = stringToFloat(document.getElementById('lvA').value);
    var lvB = stringToFloat(document.getElementById('lvB').value);
    var numberOfBees = stringToFloat(document.getElementById('noB').value);
    try {
        if (isNaN(bonus_bft) || bonus_bft < 100 || (bonus_bft > 110 && bonus_bft < 120) || bonus_bft > 130) throw 101;
        if (isNaN(lvA) || isNaN(lvB) || checkAppropriateLevel(lvA, lvB)) throw 102;
        if (isNaN(numberOfBees) || numberOfBees < 1 || numberOfBees > 50) throw 103;
    } catch (errorNumber) {
        if (errorNumber === 101) alert("You didn't input the right BONUS BFT");
        if (errorNumber === 102) alert("You didn't input the right LEVEL");
        if (errorNumber === 103) alert("You didn't input the right NUMBER OF BEES");
        //console.log("\nError code: " + errorNumber);
        return;
    }

    //3. Process
    //3.1. Create table rows by calling hfbs
    var hfbs = honeyForBees(lv_honey, bonus_bft, lvA, lvB, numberOfBees);

    //3.2. Update totalHoneyRequired element (which is a paragraph)
    var abb = getAbbreviationString_FromFloatNumber(hfbs);
    var numAbb = getNumber_FromAbbreviationString(abb);

    totalHoneyRequired.innerHTML = 
    `<h2 class="dotbox margin0">
    You need <span class="redText">${(hfbs/numAbb).toFixed(3)}${abb}</span> HONEY
    in order to LEVEL UP ${numberOfBees}${(numberOfBees === 1 ? " bee" : " bees")}
    FROM LEVEL ${lvA} TO LEVEL ${lvB} with ${bonus_bft}% bft
    </h2>`

    placeHolder.innerHTML = `Just a placeholder`
}