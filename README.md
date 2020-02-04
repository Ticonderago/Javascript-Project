# [JavaScript-Project](https://ticonderago.github.io/Javascript-Project/)
JavaScript Project is a frontend project that works with HTML canvas to draw live drawings of a variety of shapes with different attributes and able to save artworks created by the user.

Developed by: [Nathan Reinhardt](https://github.com/Ticonderago)

## Table of Contents
* [Technologies](#technologies)
* [Features](#features)
* [Code Snipets](#code-snipets)
* [Screenshots](#screenshots)

## Technologies
* JavaScript
* CSS3
* HTML5
* Local Storage

## Features
 * Live Drawing with the canvas to draw 3 different types of shapes.
 * Using local storage to help draw shapes and keep logic in check.
 * Save and Load feature to save multiple drawings in one save state to go back to in the future.
 * Clear button feature to clear the current drawing you are on to draw something new.
 * "How To" page to help the user understand how the project works and insturctions on how to start.
 
## Code Snipets
 ### The Star Drawing Function
 When the mouseup or mouseout event handler is triggered, this function will be fired.  It takes the current downmouse
x and y postions and the same for when the mouseup or mouseout events are triggered to get the start and end points for 
the star to be drawn. First you grab the canvas with the canvas id to get the context of the canvas to start working with it. Next, I checked to clear the canvas if this is the first drawing being drawn onto the canvas since I need to clear all previous drawings. Second was to check if this was a drawing being load from the save feature. Third was to draw the shape. I had to put some logic in to make sure that the y postions after subtracting them would not be negitive so I would not get negitive numbers when drawing the star.  Last is to fillcheck the shape to check whether or not the user wants the shape to be filled with color or not.

 ```JavaScript
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
 ```
 ### Save Button Function
 For the save load feature this is a snippet of the save part when the user clicks on the "Save Artwork" button the main function fires and the main function just checks for the buttons htmlTextContent to see what the button says. It matches the "htmlText" with any string that I choose for logic. If the "Save Artwork" button is clicked I create two variables to have an array of keys and an array of values.  After I use a for loop to assign every key to the corresponding value in the other array. So index position 0 of the first array will be the key for the index postion 0 of the second array which is the value for that key and so on.  After all of this I show the user that all the information for the artwork has been saved. Keys start with S in front of the current key values for "Save".
```JavaScript
// saves all properties for the restore to use
    if (htmlText === "Save Artwork") {

        var newSaveKeys = [
            "SD1X", "SD1Y", "SD2X", "SD2Y", "SD3X", "SD3Y", "SU1X", "SU1Y", "SU2X", "SU2Y", "SU3X", "SU3Y",
            "SD1Checked", "SD2Checked", "SD3Checked", "SD1FillColor", "SD2FillColor", "SD3FillColor",
            "SD1LColor", "SD2LColor", "SD3LColor", "SD1LWidth", "SD2LWidth", "SD3LWidth", "SD1Bol", "SD2Bol", "SD3Bol",
            "SD1DrawFunction", "SD2DrawFunction", "SD3DrawFunction", "SD1fP", "SD2fP", "SD3fP"
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
            localStorage.getItem("D1DrawFunction"), localStorage.getItem("D2DrawFunction"),
            localStorage.getItem("D3DrawFunction"), localStorage.getItem("D1fP"), 
            localStorage.getItem("D2fP"), localStorage.getItem("D3fP")
        ];

        for (let i = 0; i < newSaveKeys.length; i++) {
            localStorage.setItem(newSaveKeys[i], savedValues[i]);
        }

        document.getElementById("has-loaded").innerHTML = "";
        document.getElementById("has-saved").innerHTML = "Saved!";
    }
```
 
## Screenshots

![](images/javascriptproj1.jpeg)

![](images/javascriptproj2.jpeg)
