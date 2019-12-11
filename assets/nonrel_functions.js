/*  reload the page */

// const reloadFunction = () => {
//     location.reload();
// }

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

module.exports = { reloadFunction, check, lineColor, fillColor };