// if a refresh has occured do this
if (localStorage.getItem("refresh") === "true") {
    let setDrawingNum = localStorage.getItem("CurrD");
    let button1 = document.getElementById("drawing-1");
    let button2 = document.getElementById("drawing-2");
    let button3 = document.getElementById("drawing-3");

    if (button1 === null) {
        button1 = document.getElementById("dis-d1");
    }
    else if (button2 === null) {
        button2 = document.getElementById("dis-d2");
    }
    else if (button3 === null) {
        button3 = document.getElementById("dis-d3");
    }

    if (setDrawingNum === "D1") {
        button1.id = "dis-d1";
        button1.disabled = true;
    }
    else if (setDrawingNum === "D2") {
        button2.id = "dis-d2";
        button2.disabled = true;
    }
    else if (setDrawingNum === "D3") {
        button3.id = "dis-d3";
        button3.disabled = true;
    }
    else {
        let output = document.getElementById("current-drawing");
        output.innerHTML = "No Drawing Selected!";
        updateDrawInfo(localStorage.getItem("CurrD"));
    }
    localStorage.setItem("refresh", "false");
}