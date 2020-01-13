// null cases covered, first time visiting the website

if (localStorage.getItem("firstTime") === null) {
    var functionPicker = "0";
    localStorage.setItem("fP", functionPicker);

    var keys = [
        "checked", "lineWidth", "Save", "Restore",
        "lineColor", "fillColor", "downBool", "opacity",
        "D1Bol", "D2Bol", "D3Bol", "CurrD", "canvClearBol",
        "D1DrawFunction", "D2DrawFunction", "D3DrawFunction"
    ];
    var values = [
        "false", "0", "false", "false",
        "#000000", "#000000", "false", "false",
        "true", "false", "false", "D1", "true",
        "Box", "Pentagon", "Star"
    ];

    for (let i = 0; i < keys.length; i++) {
        if (localStorage.getItem(keys[i]) === null) {
            localStorage.setItem(keys[i], values[i]);
        }
    }

    localStorage.setItem("firstTime", "false");
}

// functions for the canvas

// getting mouse cursor positions

const getCursorPositionDown = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if (localStorage.getItem("CurrD") === "D1") {
        localStorage.setItem("DD1X", x);
        localStorage.setItem("DD1Y", y);
    }

    if (localStorage.getItem("CurrD") === "D2") {
        localStorage.setItem("DD2X", x);
        localStorage.setItem("DD2Y", y);
    }

    if (localStorage.getItem("CurrD") === "D3") {
        localStorage.setItem("DD3X", x);
        localStorage.setItem("DD3Y", y);
    }
}

const getCursorPositionUp = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if (localStorage.getItem("CurrD") === "D1") {
        localStorage.setItem("DU1X", x);
        localStorage.setItem("DU1Y", y);
    }

    if (localStorage.getItem("CurrD") === "D2") {
        localStorage.setItem("DU2X", x);
        localStorage.setItem("DU2Y", y);
    }

    if (localStorage.getItem("CurrD") === "D3") {
        localStorage.setItem("DU3X", x);
        localStorage.setItem("DU3Y", y);
    }

    returnFunction();
}

// when a button is clicked this occurs
const mainFunction = (htmlText) => {
    var functionName = "";

    var draw1 = document.getElementById("drawing-1");
    var draw2 = document.getElementById("drawing-2");
    var draw3 = document.getElementById("drawing-3");
    // checking if the id has been changed of the button
    if (draw1 === null) {
        draw1 = document.getElementById("dis-d1");
    }
    if (draw2 === null) {
        draw2 = document.getElementById("dis-d2");
    }
    if (draw3 === null) {
        draw3 = document.getElementById("dis-d3");
    }

    // saves all properties for the restore to use
    if (htmlText === "Save Artwork") {

        if (localStorage.getItem("Save") === undefined) {
            // once new keys have been added and set in local move code here!
        }

        var newSaveKeys = [
            "Save", "saveFill", "saveLine", "saveLineColor", "saveFillColor"
        ];

        var savedValues = [
            "true", localStorage.getItem("checked"), localStorage.getItem("lineWidth"), 
            localStorage.getItem("lineColor"), localStorage.getItem("fillColor")
        ];

        for (let i = 0; i < newSaveKeys.length; i++) {
            localStorage.setItem(newSaveKeys[i], savedValues[i]);
        }

        if (localStorage.getItem("savefP") === "1") {
            localStorage.setItem("saveName", "Box");
        }
        else if (localStorage.getItem("savefP") === "2") {
            localStorage.setItem("saveName", "Pentagon");
        }
        else if (localStorage.getItem("savefP") === "3") {
            localStorage.setItem("saveName", "Star");
        }

        document.getElementById("has-loaded").innerHTML = "";
        document.getElementById("has-saved").innerHTML = "Saved!";
    }
    
    // if load drawing is clicked
    if (htmlText === "Load Artwork") {

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
        resetDrawSelection("Box");
    }

    // selecting spiral to draw
    if (htmlText === "Pentagon") {
        functionPicker = "2";
        functionName = "Pentagon";
        localStorage.setItem("Pentagon", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Pentagon")}`;
        resetDrawSelection("Pentagon");
    }

    // selecting star to draw
    if (htmlText === "Star") {
        functionPicker = "3";
        functionName = "Star";
        localStorage.setItem("Star", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
        resetDrawSelection("Star");
    }

    // selecting drawing #1
    if (htmlText === "Drawing #1") {
        localStorage.setItem("CurrD", "D1");
        draw1.id = "dis-d1";
        draw1.disabled = true;
        localStorage.setItem("D1Bol", "true");  /////// THIS MIGHT NEED TO BE REFACTORED!

        // change the id of drawing button back when a different button is clicked
        if (draw2.id === "dis-d2") {
            draw2.id = "drawing-2";
            draw2.disabled = false;
        }
        if (draw3.id === "dis-d3") {
            draw3.id = "drawing-3";
            draw3.disabled = false;
        }

        // when a new drawing is selected I want to keep the old attributes of the drawing
        resetAttr(localStorage.getItem("CurrD"));

        functionName = "Drawing #1";
        localStorage.setItem("D1", functionName)
        let output = document.getElementById("current-drawing");
        output.innerHTML = `${localStorage.getItem("D1")} Selected`;
    }

    // selecting drawing #2
    if (htmlText === "Drawing #2") {
        localStorage.setItem("CurrD", "D2");
        draw2.id = "dis-d2";
        draw2.disabled = true;
        localStorage.setItem("D2Bol", "true");

        // change the id of drawing button back when a different button is clicked
        if (draw1.id === "dis-d1") {
            draw1.id = "drawing-1";
            draw1.disabled = false;
        }
        if (draw3.id === "dis-d3") {
            draw3.id = "drawing-3";
            draw3.disabled = false;
        }

        // when a new drawing is selected I want to keep the old attributes of the drawing
        resetAttr(localStorage.getItem("CurrD"));

        functionName = "Drawing #2";
        localStorage.setItem("D2", functionName)
        let output = document.getElementById("current-drawing");
        output.innerHTML = `${localStorage.getItem("D2")} Selected`;
    }

    // selecting drawing #3
    if (htmlText === "Drawing #3") {
        localStorage.setItem("CurrD", "D3");
        draw3.id = "dis-d3";
        draw3.disabled = true;
        localStorage.setItem("D3Bol", "true");

        // change the id of drawing button back when a different button is clicked
        if (draw1.id === "dis-d1") {
            draw1.id = "drawing-1";
            draw1.disabled = false;
        }
        if (draw2.id === "dis-d2") {
            draw2.id = "drawing-2";
            draw2.disabled = false;
        }

        // when a new drawing is selected I want to keep the old attributes of the drawing
        resetAttr(localStorage.getItem("CurrD"));

        functionName = "Drawing #3";
        localStorage.setItem("D3", functionName)
        let output = document.getElementById("current-drawing");
        output.innerHTML = `${localStorage.getItem("D3")} Selected`;
    }
}

// when switching drawings, after calling "resetDrawSelection", I want
// the function picker to pick the current selection above the canvas
const fpSetter = (Shape) => {
    if (Shape === "Box") {
        localStorage.setItem("fP", "1");
    }

    if (Shape === "Pentagon") {
        localStorage.setItem("fP", "2");
    }

    if (Shape === "Star") {
        localStorage.setItem("fP", "3");
    }
}

// carrying over draw functions when switching drawings
const resetDrawSelection = (Shape) => {
    if (localStorage.getItem("CurrD") === "D1") {
        localStorage.setItem("D1DrawFunction", Shape);
    }

    if (localStorage.getItem("CurrD") === "D2") {
        localStorage.setItem("D2DrawFunction", Shape);
    }

    if (localStorage.getItem("CurrD") === "D3") {
        localStorage.setItem("D3DrawFunction", Shape);
    }

    fpSetter(Shape);
}

// carrying over previous attributes of a drawing
const resetAttr = (CurrD) => {
    if (CurrD === "D1") {
        resetAttrHelper(CurrD);
    }

    if (CurrD === "D2") {
        resetAttrHelper(CurrD);
    }

    if (CurrD === "D3") {
        resetAttrHelper(CurrD);
    }

    sidebarUpdate(
        localStorage.getItem("checked"), localStorage.getItem("lineColor"),
        localStorage.getItem("fillColor"), localStorage.getItem("lineWidth")
    );
}

// does all the setting and getting for information carrying over to the sidebar
const resetAttrHelper = (CurrD) => {
    localStorage.setItem("checked", localStorage.getItem(`${CurrD}Checked`));
    localStorage.setItem("lineWidth", localStorage.getItem(`${CurrD}LWidth`));
    localStorage.setItem("lineColor", localStorage.getItem(`${CurrD}LColor`));
    localStorage.setItem("fillColor", localStorage.getItem(`${CurrD}FillColor`));
    let selectTitle = document.getElementById("current-selection");
    selectTitle.innerHTML = `Current Selection - ${localStorage.getItem(`${CurrD}DrawFunction`)}`;
    resetDrawSelection(localStorage.getItem(`${CurrD}DrawFunction`));
}

// updates the sidebar when switching drawings
const sidebarUpdate = (checked, linecolor, fillcolor, keepLineText) => {
    // setting checkbox for fill to be unchecked or checked
    if (checked === "true") {
        document.getElementById("myCheck").checked = true;
    }
    if (checked === "false") {
        document.getElementById("myCheck").checked = false;
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
}

// This function makes sure that the current drawing will use the right draw function
const correctDrawF = (drawType) => {
    if (localStorage.getItem("CurrD") === "D1") {
        localStorage.setItem("D1Function", drawType);
    }

    if (localStorage.getItem("CurrD") === "D2") {
        localStorage.setItem("D2Function", drawType);
    }

    if (localStorage.getItem("CurrD") === "D3") {
        localStorage.setItem("D3Function", drawType);
    }
}

// When the specific drawing is ready to start being drawn
const callingDrawF = (drawFunction, downX, downY, upX, upY, LWidth, LColor) => {
    if (localStorage.getItem(drawFunction) === "Box") {
        box(downX, downY, upX, upY, LWidth, LColor);
    }
    if (localStorage.getItem(drawFunction) === "Pentagon") {
        pentagon(downX, downY, upX, upY, LWidth, LColor);
    }
    if (localStorage.getItem(drawFunction) === "Star") {
        star(downX, downY, upX, upY, LWidth, LColor);
    }
}

// when the properties of a drawing are changed by a user, update the
// information for the drawing to use
const updateDrawInfo = (CurrD) => {
    localStorage.setItem(`${CurrD}Checked`, localStorage.getItem("checked"));
    localStorage.setItem(`${CurrD}LWidth`, localStorage.getItem("lineWidth"));
    localStorage.setItem(`${CurrD}LColor`, localStorage.getItem("lineColor"));
    localStorage.setItem(`${CurrD}FillColor`, localStorage.getItem("fillColor"));
}

// onload for drawing selected
const selectedDrawing = () => {
    let selectDraw = document.getElementById("current-drawing");
    let curr = localStorage.getItem("CurrD");
    if (curr === "D1") {
        selectDraw.innerHTML = "Drawing #1 Selected";
    }
    else if (curr === "D2") {
        selectDraw.innerHTML = "Drawing #2 Selected";
    }
    else {
        selectDraw.innerHTML = "Drawing #3 Selected";
    }
}

// when the page is reloaded runs this function
const returnFunction = () => {

    // save function needs updating later....

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

        selectedDrawing();

        if (localStorage.getItem("fP") === "0") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - none`;
            initial();
        }
    
        if (localStorage.getItem("fP") === "1") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Box")}`;
            correctDrawF(localStorage.getItem("Box"));
        }
    
        if (localStorage.getItem("fP") === "2") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Pentagon")}`;
            correctDrawF(localStorage.getItem("Pentagon"));
        }
    
        if (localStorage.getItem("fP") === "3") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
            correctDrawF(localStorage.getItem("Star"));
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

    // reseting text for save and load function
    document.getElementById("has-saved").innerHTML = "";

    if (localStorage.getItem("Restore") === "true") {
        localStorage.setItem("Restore", "false");
    }
    
    // now to set all shape details for specific current drawing selected

    var currentDrawing = localStorage.getItem("CurrD");

    if (currentDrawing === "D1") {
        updateDrawInfo(currentDrawing);
    }

    if (currentDrawing === "D2") {
        updateDrawInfo(currentDrawing);
    }

    if (currentDrawing === "D3") {
        updateDrawInfo(currentDrawing);
    }

    // time to draw for specific slot

    localStorage.setItem("drawNum", "D1");

    if (localStorage.getItem("D1Bol") === "true") {
        callingDrawF(
            localStorage.getItem("D1Function"), localStorage.getItem("DD1X"), localStorage.getItem("DD1Y"),
            localStorage.getItem("DU1X"), localStorage.getItem("DU1Y"), 
            localStorage.getItem("D1LWidth"), localStorage.getItem("D1LColor")
        );
    }

    localStorage.setItem("drawNum", "D2");

    if (localStorage.getItem("D2Bol") === "true") {
        callingDrawF(
            localStorage.getItem("D2Function"), localStorage.getItem("DD2X"), localStorage.getItem("DD2Y"),
            localStorage.getItem("DU2X"), localStorage.getItem("DU2Y"), 
            localStorage.getItem("D2LWidth"), localStorage.getItem("D2LColor")
        );
    }

    localStorage.setItem("drawNum", "D3");

    if (localStorage.getItem("D3Bol") === "true") {
        callingDrawF(
            localStorage.getItem("D3Function"), localStorage.getItem("DD3X"), localStorage.getItem("DD3Y"),
            localStorage.getItem("DU3X"), localStorage.getItem("DU3Y"), 
            localStorage.getItem("D3LWidth"), localStorage.getItem("D3LColor")
        );
    }

    localStorage.setItem("canvClearBol", "true");
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
const box = (downX, downY, upX, upY, LWidth, LColor) => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        canvasClear(ctx, canvas);

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
            ctx.lineWidth = LWidth;   // (line width)
            ctx.strokeStyle = LColor; // (line color)

            opacityCheck(ctx);

            var drawX = parseInt(downX, 10);
            var drawY = parseInt(downY, 10);

            var drawEndX = parseInt(upX, 10);
            var drawEndY = parseInt(upY, 10);
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
const pentagon = (downX, downY, upX, upY, LWidth, LColor) => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        canvasClear(ctx, canvas);

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
            ctx.lineWidth = LWidth;   // (line width)
            ctx.strokeStyle = LColor; // (line color)

            opacityCheck(ctx);

            var drawX = parseInt(downX, 10);
            var drawY = parseInt(downY, 10);

            var drawEndX = parseInt(upX, 10);
            var drawEndY = parseInt(upY, 10);
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
const star = (downX, downY, upX, upY, LWidth, LColor) => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        canvasClear(ctx, canvas);

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
            ctx.lineWidth = LWidth;   // (line width)
            ctx.strokeStyle = LColor; // (line color)

            opacityCheck(ctx);

            var drawX = parseInt(downX, 10);
            var drawY = parseInt(downY, 10);

            var drawEndX = parseInt(upX, 10);
            var drawEndY = parseInt(upY, 10);
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

// Function to clear canvas only if the first drawing is being drawn
const canvasClear = (ctx, canvas) => {
    if (localStorage.getItem("canvClearBol") === "true") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.setItem("canvClearBol", "false");
    }
}

// Checking for fill function

const fillChecking = (ctx) => {
    if (localStorage.getItem("Restore") === "true") {
        if (localStorage.getItem("drawNum") === "D1") {
            if (localStorage.getItem("saveFill") === "true") {
                // Filled Star if checked
                ctx.fillStyle = localStorage.getItem("saveFillColor"); // (fill color)
                ctx.fill();
            }
            ctx.stroke();
        }
        if (localStorage.getItem("drawNum") === "D2") {
            if (localStorage.getItem("saveFill") === "true") {
                // Filled Star if checked
                ctx.fillStyle = localStorage.getItem("saveFillColor"); // (fill color)
                ctx.fill();
            }
            ctx.stroke();
        }
        if (localStorage.getItem("drawNum") === "D3") {
            if (localStorage.getItem("saveFill") === "true") {
                // Filled Star if checked
                ctx.fillStyle = localStorage.getItem("saveFillColor"); // (fill color)
                ctx.fill();
            }
            ctx.stroke();
        }
    }
    else {
        if (localStorage.getItem("drawNum") === "D1") {
            if (localStorage.getItem("D1Checked") === "true") {
                // Filled Star if checked
                ctx.fillStyle = localStorage.getItem("D1FillColor");
                ctx.fill();
            }
            ctx.stroke();
        }
        if (localStorage.getItem("drawNum") === "D2") {
            if (localStorage.getItem("D2Checked") === "true") {
                // Filled Star if checked
                ctx.fillStyle = localStorage.getItem("D2FillColor");
                ctx.fill();
            }
            ctx.stroke();
        }
        if (localStorage.getItem("drawNum") === "D3") {
            if (localStorage.getItem("D3Checked") === "true") {
                // Filled Star if checked
                ctx.fillStyle = localStorage.getItem("D3FillColor");
                ctx.fill();
            }
            ctx.stroke();
        }
    }
}

// Checking for opacity

const opacityCheck = (ctx) => {
    if (localStorage.getItem("CurrD") === localStorage.getItem("drawNum")) {
        if (localStorage.getItem("resetopacity") === "false") {
            if (localStorage.getItem("opacity") === "true") {
                ctx.globalAlpha = 0.7;
            }
            else {
                ctx.globalAlpha = 1;
            }
        }
        else {
            ctx.globalAlpha = 1;
        }
    }
}

module.exports = { 
    returnFunction, 
    mainFunction, 
    getCursorPositionDown,
    getCursorPositionUp
};