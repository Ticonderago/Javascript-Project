
/* checkbox function */

const check = () => {
    let isChecked = document.getElementById("myCheck").checked;
    localStorage.setItem("checked", isChecked);
}

/* line color picker */

const lineColor = () => {
    let linecolor = document.getElementById("myColor").value;
    document.getElementById("actual-l-color").innerHTML = linecolor;
    localStorage.setItem("lineColor", linecolor);
}

/* fill color picker */

const fillColor = () => {
    let fillcolor = document.getElementById("myFillColor").value;
    document.getElementById("actual-f-color").innerHTML = fillcolor;
    localStorage.setItem("fillColor", fillcolor);
}

/* how to button - moving too and back from the help page */

const pageTransfer = (htmlText) => {

    if (htmlText === "How To") {
        document.getElementById("root").id = "no-root";
        document.getElementById("no-how-to-page").id = "how-to-page";
    }

    if (htmlText === "Back To Canvas") {
        document.getElementById("how-to-page").id = "no-how-to-page";
        document.getElementById("no-root").id = "root";
    }
}

/* when you are on the site first time the X button for the how to 
makes the how to button on the canvas show the how to button on the 
top of the page instead. Only used first time visit. Can't use the
canvas until this button is pressed */

const xOut = () => {
    document.getElementById("start-how-to-container").id = "no-start-how-to-container";
    document.getElementById("no-how-to-but").id = "how-to-but";
    if (localStorage.getItem("howTo") === "true") {
        localStorage.setItem("howTo", "false");
        location.reload();
    }
}