// null cases covered

if (localStorage.getItem("fP") === null) {
    var functionPicker = "0";
    localStorage.setItem("fP", functionPicker);
}

var keys = ["checked", "lineWidth", "Save", "Restore", "lineColor", "fillColor", "downBool"];
var values = ["false", "0", "false", "false", "#000000", "#000000", "false"]

for (let i = 0; i < keys.length; i++) {
    if (localStorage.getItem(keys[i]) === null) {
        localStorage.setItem(keys[i], values[i]);
    }
}

// functions for the canvas

// getting mouse cursor position

const getCursorPositionDown = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    localStorage.setItem("useX", x);
    localStorage.setItem("useY", y);
}

const getCursorPositionUp = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    localStorage.setItem("upX", x);
    localStorage.setItem("upY", y);
    returnFunction();
}

// button function
const mainFunction = (htmlText) => {
    var functionName = "";

    // saves all properties for the restore to use
    if (htmlText === "Save Drawing") {

        var newSaveKeys = ["Save", "savefP", "saveFill", "saveLine", 
                            "saveLineColor", "saveFillColor", "saveX", 
                            "saveY", "saveUpX", "saveUpY"
                        ];

        var savedValues = ["true", localStorage.getItem("fP"), 
                            localStorage.getItem("checked"), 
                            localStorage.getItem("lineWidth"), 
                            localStorage.getItem("lineColor"), 
                            localStorage.getItem("fillColor"),
                            localStorage.getItem("useX"),
                            localStorage.getItem("useY"),
                            localStorage.getItem("upX"),
                            localStorage.getItem("upY")
                        ];

        for (let i = 0; i < newSaveKeys.length; i++) {
            localStorage.setItem(newSaveKeys[i], savedValues[i]);
        }

        if (localStorage.getItem("savefP") === "1") {
            localStorage.setItem("saveName", "Box");
        }
        else if (localStorage.getItem("savefP") === "2") {
            localStorage.setItem("saveName", "Spiral");
        }
        else if (localStorage.getItem("savefP") === "3") {
            localStorage.setItem("saveName", "Star");
        }

        document.getElementById("has-loaded").innerHTML = "";
        let hasSaved = "Saved!"
        document.getElementById("has-saved").innerHTML = hasSaved;
    }
    
    // if load drawing is clicked
    if (htmlText === "Load Drawing") {

        document.getElementById("has-saved").innerHTML = "";
        let hasLoaded = "Loaded!"
        document.getElementById("has-loaded").innerHTML = hasLoaded;

        localStorage.setItem("Restore", "true");
        returnFunction();
    }

    // selecting box to draw
    if (htmlText === "Box") {
        functionPicker = "1";
        functionName = "Box";
        localStorage.setItem("Box", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Box")}`;
    }

    // selecting spiral to draw
    if (htmlText === "Pentagon") {
        functionPicker = "2";
        functionName = "Pentagon";
        localStorage.setItem("Pentagon", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Pentagon")}`;
    }

    // selecting star to draw
    if (htmlText === "Star") {
        functionPicker = "3";
        functionName = "Star";
        localStorage.setItem("Star", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
    }
}

// when the page is reloaded runs this function
const returnFunction = () => {

    // when user calls to load the old drawing
    if (localStorage.getItem("Restore") === "true") {
    
        if (localStorage.getItem("savefP") === "1") {
            box();
        }
    
        if (localStorage.getItem("savefP") === "2") {
            pentagon();
        }
    
        if (localStorage.getItem("savefP") === "3") {
            star();
        }

        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("saveName")}`;
    
        if (localStorage.getItem("saveFill") === "true") {
            document.getElementById("myCheck").checked = true;
        }

        var keepLineText = localStorage.getItem("saveLine");

        var linecolor = localStorage.getItem("saveLineColor");

        var fillcolor = localStorage.getItem("saveFillColor");
    }
    else {  // when user does not wanna load drawing

        if (localStorage.getItem("fP") === "0") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - none`;
            initial();
        }
    
        if (localStorage.getItem("fP") === "1") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Box")}`;
            box();
        }
    
        if (localStorage.getItem("fP") === "2") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Pentagon")}`;
            pentagon();
        }
    
        if (localStorage.getItem("fP") === "3") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
            star();
        }
    
        if (localStorage.getItem("checked") === "true") {
            document.getElementById("myCheck").checked = true;
        }
    
        var keepLineText = localStorage.getItem("lineWidth");

        var linecolor = localStorage.getItem("lineColor");

        var fillcolor = localStorage.getItem("fillColor");
    }
    
    // setting line color
    let cline = document.getElementById("actual-l-color");
    let lineColorPicker = document.getElementById("myColor");
    cline.innerHTML = linecolor;
    lineColorPicker.value = linecolor;

    // setting fill color
    let cfill = document.getElementById("actual-f-color");
    let fillColorPicker = document.getElementById("myFillColor");
    cfill.innerHTML = fillcolor;
    fillColorPicker.value = fillcolor;

    // slider inputs
    let slider = document.getElementById("myRange");
    let output = document.getElementById("line-w");
    output.innerHTML = keepLineText;
    slider.value = keepLineText;

    document.getElementById("has-saved").innerHTML = "";

    if (localStorage.getItem("Restore") === "true") {
        localStorage.setItem("Restore", "false");
    }
}

// drawing functions

// placeholder function for first time on site
const initial = () => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = localStorage.getItem("lineWidth");
        
        // Non Filled Box
        ctx.beginPath();
        ctx.moveTo(225, 225);
        ctx.lineTo(305, 225);
        ctx.lineTo(305, 305);
        ctx.lineTo(225, 305)
        ctx.closePath();
        ctx.stroke();
    }
}

// Box Drawing
const box = () => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // if load is true take from save
        if (localStorage.getItem("Restore") === "true") {
            ctx.lineWidth = localStorage.getItem("saveLine");
            ctx.strokeStyle = localStorage.getItem("saveLineColor");

            var drawX = parseInt(localStorage.getItem("saveX"), 10);
            var drawY = parseInt(localStorage.getItem("saveY"), 10);

            var drawEndX = parseInt(localStorage.getItem("saveUpX"), 10);
            var drawEndY = parseInt(localStorage.getItem("saveUpY"), 10);
        }
        else {  // when load is not true
            document.getElementById("has-loaded").innerHTML = "";
            ctx.lineWidth = localStorage.getItem("lineWidth");
            ctx.strokeStyle = localStorage.getItem("lineColor"); // (line color)

            var drawX = parseInt(localStorage.getItem("useX"), 10);
            var drawY = parseInt(localStorage.getItem("useY"), 10);

            var drawEndX = parseInt(localStorage.getItem("upX"), 10);
            var drawEndY = parseInt(localStorage.getItem("upY"), 10);
        }

        // checking the end point to make sure the drawing is properly constructed
        var diffX = drawEndX - drawX;
        var diffY = drawEndY - drawY;

        ctx.beginPath();
        ctx.moveTo(drawX, drawY);
        ctx.lineTo((drawX + diffX), drawY);
        ctx.lineTo((drawX + diffX), (drawY + diffY));
        ctx.lineTo(drawX, (drawY + diffY));
        ctx.closePath();

        fillChecking(ctx);
    }
}

// Pentagon Drawing
const pentagon = () => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // if load is true take from save
        if (localStorage.getItem("Restore") === "true") {
            ctx.lineWidth = localStorage.getItem("saveLine");
            ctx.strokeStyle = localStorage.getItem("saveLineColor");

            var drawX = parseInt(localStorage.getItem("saveX"), 10);
            var drawY = parseInt(localStorage.getItem("saveY"), 10);

            var drawEndX = parseInt(localStorage.getItem("saveUpX"), 10);
            var drawEndY = parseInt(localStorage.getItem("saveUpY"), 10);
        }
        else {  // when load is not true
            document.getElementById("has-loaded").innerHTML = "";
            ctx.lineWidth = localStorage.getItem("lineWidth");
            ctx.strokeStyle = localStorage.getItem("lineColor"); // (line color)

            var drawX = parseInt(localStorage.getItem("useX"), 10);
            var drawY = parseInt(localStorage.getItem("useY"), 10);

            var drawEndX = parseInt(localStorage.getItem("upX"), 10);
            var drawEndY = parseInt(localStorage.getItem("upY"), 10);
        }

        // checking the end point to make sure the drawing is properly constructed
        var diffX = drawEndX - drawX;

        if (drawEndY < drawY) {     // when the end Y is smaller than the start Y
            var diffY = drawY - drawEndY;

            ctx.beginPath();
            ctx.moveTo(drawX + (diffX / 2), drawEndY);
            ctx.lineTo(drawEndX, drawEndY + (diffY / 2.25));
            ctx.lineTo(drawEndX - (diffX / 4), drawY);
            ctx.lineTo(drawX + (diffX / 4), drawY);
            ctx.lineTo(drawX, drawEndY + (diffY / 2.25));
            ctx.closePath();
        } else {    // when end Y is greater than start Y
            var diffY = drawEndY - drawY;

            ctx.beginPath();
            ctx.moveTo(drawX + (diffX / 2), drawY);
            ctx.lineTo(drawEndX, drawY + (diffY / 2.25));
            ctx.lineTo(drawEndX - (diffX / 4), drawEndY);
            ctx.lineTo(drawX + (diffX / 4), drawEndY);
            ctx.lineTo(drawX, drawY + (diffY / 2.25));
            ctx.closePath();
        }

        fillChecking(ctx);
    }
}

// Star Drawing
const star = () => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // if load is true take from save
        if (localStorage.getItem("Restore") === "true") {
            ctx.lineWidth = localStorage.getItem("saveLine");
            ctx.strokeStyle = localStorage.getItem("saveLineColor"); // (line color)

            var drawX = parseInt(localStorage.getItem("saveX"), 10);
            var drawY = parseInt(localStorage.getItem("saveY"), 10);

            var drawEndX = parseInt(localStorage.getItem("saveUpX"), 10);
            var drawEndY = parseInt(localStorage.getItem("saveUpY"), 10);
        }
        else {  // when load is not true
            document.getElementById("has-loaded").innerHTML = "";
            ctx.lineWidth = localStorage.getItem("lineWidth");
            ctx.strokeStyle = localStorage.getItem("lineColor");

            var drawX = parseInt(localStorage.getItem("useX"), 10);
            var drawY = parseInt(localStorage.getItem("useY"), 10);

            var drawEndX = parseInt(localStorage.getItem("upX"), 10);
            var drawEndY = parseInt(localStorage.getItem("upY"), 10);
        }

        // checking the end point to make sure the drawing is properly constructed
        var diffX = drawEndX - drawX;

        if (drawEndY < drawY) {     // when the end Y is smaller than the start Y
            var diffY = drawY - drawEndY;

            ctx.beginPath();
            ctx.moveTo(drawX + (diffX / 2), drawEndY);
            ctx.lineTo(drawEndX - (diffX / 4), drawY);
            ctx.lineTo(drawX, drawEndY + (diffY / 2.25));
            ctx.lineTo(drawEndX, drawEndY + (diffY / 2.25));
            ctx.lineTo(drawX + (diffX / 4), drawY);
            ctx.closePath();
        } else {    // when end Y is greater than start Y
            var diffY = drawEndY - drawY;

            ctx.beginPath();
            ctx.moveTo(drawX + (diffX / 2), drawY);
            ctx.lineTo(drawEndX - (diffX / 4), drawEndY);
            ctx.lineTo(drawX, drawY + (diffY / 2.25));
            ctx.lineTo(drawEndX, drawY + (diffY / 2.25));
            ctx.lineTo(drawX + (diffX / 4), drawEndY);
            ctx.closePath();
        }

        fillChecking(ctx);
    }
}

// Checking for fill function

const fillChecking = (ctx) => {
    if (localStorage.getItem("Restore") === "true") {
        if (localStorage.getItem("saveFill") === "true") {
            // Filled Star if checked
            ctx.fillStyle = localStorage.getItem("saveFillColor"); // (fill color)
            ctx.fill();
        }
        ctx.stroke();
    }
    else {
        if (localStorage.getItem("checked") === "true") {
            // Filled Star if checked
            ctx.fillStyle = localStorage.getItem("fillColor");
            ctx.fill();
        }
        ctx.stroke();
    }
}

module.exports = { 
    returnFunction, 
    mainFunction, 
    getCursorPositionDown,
    getCursorPositionUp
};