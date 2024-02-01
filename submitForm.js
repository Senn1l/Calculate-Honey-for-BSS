function SubmitForm() {
    var table = document.getElementById("calculateTable");

    ////Remove entire table
    // Check if the table exists
    if (table) {
        // Get the parent of the table (in this case, the body element)
        var parent = table.parentNode;

        // Remove the table from its parent
        parent.removeChild(table);
    } else {
        console.log("Table not found.");
    }
    newTable = document.createElement("table");
    newTable.setAttribute("id", "calculateTable");
    document.body.appendChild(newTable);

    //get parameters
    var bonus_bft = document.getElementById('bft').value;
    var a = document.getElementById('lvA').value;
    var b = document.getElementById('lvB').value;
    var numberOfBees = document.getElementById('noB').value;

    //parameters check
    try {
        if (bonus_bft < 100 || (bonus_bft > 110 && bonus_bft < 120) || bonus_bft > 130) throw 101;
        if (checkAppropriateLevel(a, b)) throw 102;
        if (numberOfBees < 0 || numberOfBees > 50) throw 103;
    } catch (errorNumber) {
        if (errorNumber === 101) alert("You didn't input the right BONUS BFT");
        if (errorNumber === 102) alert("You didn't input the right LEVEL");
        if (errorNumber === 103) alert("You didn't input the right NUMBER OF BEES");
        //console.log("\nError code: " + errorNumber);
        return;
    }

    processTest(bonus_bft, a, b, numberOfBees);
}