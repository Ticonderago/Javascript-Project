// null cases covered, first time visiting the website

if (localStorage.getItem("firstTime") === null) {
    var functionPicker = "0";
    localStorage.setItem("fP", functionPicker);

    var keys = [
        "checked", "lineWidth", "Save", "Restore", "CurrD",
        "lineColor", "fillColor", "downBool", "opacity",
        "D1Bol", "D2Bol", "D3Bol", "CurrD", "canvClearBol",
        "D1DrawFunction", "D2DrawFunction", "D3DrawFunction",
        "fP"
    ];
    var values = [
        "false", "0", "false", "false", "D1",
        "#000000", "#000000", "false", "false",
        "true", "false", "false", "D1", "true",
        "Box", "Pentagon", "Star", "1"
    ];

    for (let i = 0; i < keys.length; i++) {
        if (localStorage.getItem(keys[i]) === null) {
            localStorage.setItem(keys[i], values[i]);
        }
    }
    draw1.id = "dis-d1";
    draw1.disabled = true;
    localStorage.setItem("D1Bol", "true");

    resetAttr(localStorage.getItem("CurrD"));

    let name = "Drawing #1";
    localStorage.setItem("D1", name)
    let output = document.getElementById("current-drawing");
    output.innerHTML = `${localStorage.getItem("D1")} Selected`;

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

    else if (localStorage.getItem("CurrD") === "D2") {
        localStorage.setItem("DD2X", x);
        localStorage.setItem("DD2Y", y);
    }

    else {
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

    else if (localStorage.getItem("CurrD") === "D2") {
        localStorage.setItem("DU2X", x);
        localStorage.setItem("DU2Y", y);
    }

    else {
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

        var newSaveKeys = [
            "SD1X", "SD1Y", "SD2X", "SD2Y", "SD3X", "SD3Y", "SU1X", "SU1Y", "SU2X", "SU2Y", "SU3X", "SU3Y",
            "SD1Checked", "SD2Checked", "SD3Checked", "SD1FillColor", "SD2FillColor", "SD3FillColor",
            "SD1LColor", "SD2LColor", "SD3LColor", "SD1LWidth", "SD2LWidth", "SD3LWidth", "SD1Bol", "SD2Bol", "SD3Bol",
            "SD1Function", "SD2Function", "SD3Function"
        ];

        var savedValues = [
            localStorage.getItem("DD1X"), localStorage.getItem("DD1Y"), localStorage.getItem("DD2X"),
            localStorage.getItem("DD2Y"), localStorage.getItem("DD3X"), localStorage.getItem("DD3Y"),
            localStorage.getItem("DU1X"), localStorage.getItem("DU1Y"), localStorage.getItem("DU2X"),
            localStorage.getItem("DU2Y"), localStorage.getItem("DU3X"), localStorage.getItem("DU3Y"),
            localStorage.getItem("D1Checked"), localStorage.getItem("D2Checked"), localStorage.getItem("D3Checked"),
            localStorage.getItem("D1FillColor"), localStorage.getItem("D2FillColor"), localStorage.getItem("D3FillColor"),
            localStorage.getItem("D1LColor"), localStorage.getItem("D2LColor"), localStorage.getItem("D3LColor"),
            localStorage.getItem("D1LWidth"), localStorage.getItem("D2LWidth"), localStorage.getItem("D3LWidth"),
            localStorage.getItem("D1Bol"), localStorage.getItem("D2Bol"), localStorage.getItem("D3Bol"),
            localStorage.getItem("D1Function"), localStorage.getItem("D2Function"), localStorage.getItem("D3Function")
        ];

        for (let i = 0; i < newSaveKeys.length; i++) {
            localStorage.setItem(newSaveKeys[i], savedValues[i]);
        }

        document.getElementById("has-loaded").innerHTML = "";
        document.getElementById("has-saved").innerHTML = "Saved!";
    }
    
    // if load drawing is clicked
    else if (htmlText === "Load Artwork") {

        document.getElementById("has-saved").innerHTML = "";
        document.getElementById("has-loaded").innerHTML = "Loaded!";

        localStorage.setItem("Restore", "true");
        returnFunction();
    }

    // when the user wants to clear a drawing currently selected (erase it)
    else if (htmlText === "Clear") {
        clearButtonHelper(localStorage.getItem("CurrD"));
        returnFunction();
    }

    // selecting box to draw
    else if (htmlText === "Box") {
        functionPicker = "1";
        functionName = "Box";
        localStorage.setItem("Box", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Box")}`;
        resetDrawSelection("Box");
    }

    // selecting spiral to draw
    else if (htmlText === "Pentagon") {
        functionPicker = "2";
        functionName = "Pentagon";
        localStorage.setItem("Pentagon", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Pentagon")}`;
        resetDrawSelection("Pentagon");
    }

    // selecting star to draw
    else if (htmlText === "Star") {
        functionPicker = "3";
        functionName = "Star";
        localStorage.setItem("Star", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
        resetDrawSelection("Star");
    }

    // selecting drawing #1
    else if (htmlText === "Drawing #1") {
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
    else if (htmlText === "Drawing #2") {
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
    else if (htmlText === "Drawing #3") {
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

// helper function for clearing drawings
const clearButtonHelper = (CurrD) => {
    localStorage.setItem(`${CurrD}Bol`, "false");
    if (CurrD === "D1") {
        // start here when you get back
    }
    else if (CurrD === "D2") {

    }
    else {
        
    }
}

// when switching drawings, after calling "resetDrawSelection", I want
// the function picker to pick the current selection above the canvas
const fpSetter = (Shape) => {
    if (Shape === "Box") {
        localStorage.setItem("fP", "1");
    }

    else if (Shape === "Pentagon") {
        localStorage.setItem("fP", "2");
    }

    else if (Shape === "Star") {
        localStorage.setItem("fP", "3");
    }
}

// carrying over draw functions when switching drawings
const resetDrawSelection = (Shape) => {
    if (localStorage.getItem("CurrD") === "D1") {
        localStorage.setItem("D1DrawFunction", Shape);
    }

    else if (localStorage.getItem("CurrD") === "D2") {
        localStorage.setItem("D2DrawFunction", Shape);
    }

    else {
        localStorage.setItem("D3DrawFunction", Shape);
    }

    fpSetter(Shape);
}

// carrying over previous attributes of a drawing
const resetAttr = (CurrD) => {
    resetAttrHelper(CurrD);
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
    else if (checked === "false") {
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

    else if (localStorage.getItem("CurrD") === "D2") {
        localStorage.setItem("D2Function", drawType);
    }

    else {
        localStorage.setItem("D3Function", drawType);
    }
}

// When the specific drawing is ready to start being drawn
const callingDrawF = (drawFunction, downX, downY, upX, upY, LWidth, LColor) => {
    if (localStorage.getItem(drawFunction) === "Box") {
        box(downX, downY, upX, upY, LWidth, LColor);
    }
    else if (localStorage.getItem(drawFunction) === "Pentagon") {
        pentagon(downX, downY, upX, upY, LWidth, LColor);
    }
    else if (localStorage.getItem(drawFunction) === "Star") {
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

// saveOutput is when the page is being loaded with an artwork,
// it takes the current drawing you are on and makes sure that the selection matches once loaded
const saveOutputSelection = (SCurrD) => {
    var saveOutput = document.getElementById("current-selection");

    if (localStorage.getItem(`${SCurrD}Function`) === "Box") {
        saveOutput.innerHTML = `Current Selection - ${localStorage.getItem("Box")}`;
        localStorage.setItem("fP", "1");
    }
    else if (localStorage.getItem(`${SCurrD}Function`) === "Pentagon") {
        saveOutput.innerHTML = `Current Selection - ${localStorage.getItem("Pentagon")}`;
        localStorage.setItem("fP", "2");
    }
    else if (localStorage.getItem(`${SCurrD}Function`) === "Star") {
        saveOutput.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
        localStorage.setItem("fP", "3");
    }
}

// when the page is reloaded runs this function
const returnFunction = () => {

    // save function needs updating later....

    // when user calls to load the old drawing
    if (localStorage.getItem("Restore") === "true") {

        selectedDrawing();

        if (localStorage.getItem("CurrD") === "D1") {
            let input = "S" + `${localStorage.getItem("CurrD")}`;
            saveOutputSelection(input);
        }
        else if (localStorage.getItem("CurrD") === "D2") {
            let input = "S" + `${localStorage.getItem("CurrD")}`;
            saveOutputSelection(input);
        }
        else {
            let input = "S" + `${localStorage.getItem("CurrD")}`;
            saveOutputSelection(input);
        }

        // replace all D keys with the SD keys

        localStorage.setItem("DD1X", localStorage.getItem("SD1X"));
        localStorage.setItem("DD1Y", localStorage.getItem("SD1Y"));
        localStorage.setItem("DD2X", localStorage.getItem("SD2X"));
        localStorage.setItem("DD2Y", localStorage.getItem("SD2Y"));
        localStorage.setItem("DD3X", localStorage.getItem("SD3X"));
        localStorage.setItem("DD3Y", localStorage.getItem("SD3Y"));
        localStorage.setItem("DU1X", localStorage.getItem("SU1X"));
        localStorage.setItem("DU1Y", localStorage.getItem("SU1Y"));
        localStorage.setItem("DU2X", localStorage.getItem("SU2X"));
        localStorage.setItem("DU2Y", localStorage.getItem("SU2Y"));
        localStorage.setItem("DU3X", localStorage.getItem("SU3X"));
        localStorage.setItem("DU3Y", localStorage.getItem("SU3Y"));
        localStorage.setItem("D1Checked", localStorage.getItem("SD1Checked"));
        localStorage.setItem("D2Checked", localStorage.getItem("SD2Checked"));
        localStorage.setItem("D3Checked", localStorage.getItem("SD3Checked"));
        localStorage.setItem("D1FillColor", localStorage.getItem("SD1FillColor"));
        localStorage.setItem("D2FillColor", localStorage.getItem("SD2FillColor"));
        localStorage.setItem("D3FillColor", localStorage.getItem("SD3FillColor"));
        localStorage.setItem("D1LColor", localStorage.getItem("SD1LColor"));
        localStorage.setItem("D2LColor", localStorage.getItem("SD2LColor"));
        localStorage.setItem("D3LColor", localStorage.getItem("SD3LColor"));
        localStorage.setItem("D1LWidth", localStorage.getItem("SD1LWidth"));
        localStorage.setItem("D2LWidth", localStorage.getItem("SD2LWidth"));
        localStorage.setItem("D3LWidth", localStorage.getItem("SD3LWidth"));
        localStorage.setItem("D1Bol", localStorage.getItem("SD1Bol"));
        localStorage.setItem("D2Bol", localStorage.getItem("SD2Bol"));
        localStorage.setItem("D3Bol", localStorage.getItem("SD3Bol"));
        localStorage.setItem("D1Function", localStorage.getItem("SD1Function"));
        localStorage.setItem("D2Function", localStorage.getItem("SD2Function"));
        localStorage.setItem("D3Function", localStorage.getItem("SD3Function"));
    }
    else {  // when user does not wanna load drawing

        selectedDrawing();
    
        if (localStorage.getItem("fP") === "1") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Box")}`;
            correctDrawF(localStorage.getItem("Box"));
        }
    
        else if (localStorage.getItem("fP") === "2") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Pentagon")}`;
            correctDrawF(localStorage.getItem("Pentagon"));
        }
    
        else if (localStorage.getItem("fP") === "3") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
            correctDrawF(localStorage.getItem("Star"));
        }
    }

    // now to set all shape details for specific current drawing selected

    updateDrawInfo(localStorage.getItem("CurrD"));

    if (localStorage.getItem("checked") === "true") {
        document.getElementById("myCheck").checked = true;
    }

    var keepLineText = localStorage.getItem("lineWidth");

    var linecolor = localStorage.getItem("lineColor");

    var fillcolor = localStorage.getItem("fillColor");
    
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
    
    // now to set all shape details for specific current drawing selected

    if (localStorage.getItem("Restore") !== "true") {
        updateDrawInfo(localStorage.getItem("CurrD"));
    }

    // time to draw for specific slot or to draw an entire artwork
    // that has been saved

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

    if (localStorage.getItem("Restore") === "true") {
        localStorage.setItem("Restore", "false");
    }

    localStorage.setItem("canvClearBol", "true");
}

// drawing functions

// Box Drawing
const box = (downX, downY, upX, upY, LWidth, LColor) => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        canvasClear(ctx, canvas);

        // if restore is false than have opacity and clear has-loaded
        if (localStorage.getItem("Restore") !== "true") {
            document.getElementById("has-loaded").innerHTML = "";
            opacityCheck(ctx);
        }

        ctx.lineWidth = LWidth;   // (line width)
        ctx.strokeStyle = LColor; // (line color)

        var drawX = parseInt(downX, 10);
        var drawY = parseInt(downY, 10);

        var drawEndX = parseInt(upX, 10);
        var drawEndY = parseInt(upY, 10);

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

        // if restore is false than have opacity and clear has-loaded
        if (localStorage.getItem("Restore") !== "true") {
            document.getElementById("has-loaded").innerHTML = "";
            opacityCheck(ctx);
        }

        ctx.lineWidth = LWidth;   // (line width)
        ctx.strokeStyle = LColor; // (line color)

        var drawX = parseInt(downX, 10);
        var drawY = parseInt(downY, 10);

        var drawEndX = parseInt(upX, 10);
        var drawEndY = parseInt(upY, 10);

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

        // if restore is false than have opacity and clear has-loaded
        if (localStorage.getItem("Restore") !== "true") {
            document.getElementById("has-loaded").innerHTML = "";
            opacityCheck(ctx);
        }

        ctx.lineWidth = LWidth;   // (line width)
        ctx.strokeStyle = LColor; // (line color)

        var drawX = parseInt(downX, 10);
        var drawY = parseInt(downY, 10);

        var drawEndX = parseInt(upX, 10);
        var drawEndY = parseInt(upY, 10);

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
    if (localStorage.getItem("drawNum") === "D1") {
        if (localStorage.getItem("D1Checked") === "true") {
            // Filled Star if checked
            ctx.fillStyle = localStorage.getItem("D1FillColor");
            ctx.fill();
        }
        ctx.stroke();
    }
    else if (localStorage.getItem("drawNum") === "D2") {
        if (localStorage.getItem("D2Checked") === "true") {
            // Filled Star if checked
            ctx.fillStyle = localStorage.getItem("D2FillColor");
            ctx.fill();
        }
        ctx.stroke();
    }
    else if (localStorage.getItem("drawNum") === "D3") {
        if (localStorage.getItem("D3Checked") === "true") {
            // Filled Star if checked
            ctx.fillStyle = localStorage.getItem("D3FillColor");
            ctx.fill();
        }
        ctx.stroke();
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