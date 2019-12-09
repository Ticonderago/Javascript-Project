// To pick what should be drawn

if (localStorage.getItem("fP") === null) {
    var functionPicker = "0";
    localStorage.setItem("fP", functionPicker);
}

// functions for the canvas

const mainFunction = (htmlText) => {
    var functionName = "";

    if (htmlText === "Box") {
        functionPicker = "1";
        functionName = "Box";
        localStorage.setItem("Box", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Box")}`;
    }

    if (htmlText === "Spiral") {
        functionPicker = "2";
        functionName = "Spiral";
        localStorage.setItem("Spiral", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Spiral")}`;
    }

    if (htmlText === "Star") {
        functionPicker = "3";
        functionName = "Star";
        localStorage.setItem("Star", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
    }
}

const returnFunction = () => {
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
        output.innerHTML = `Current Selection - ${localStorage.getItem("Spiral")}`;
        initial();
    }

    if (localStorage.getItem("fP") === "3") {
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
        star();
    }
}

// drawing functions

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

const box = () => {
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

const star = () => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = localStorage.getItem("lineWidth");

        // Non Filled Star
        ctx.moveTo(235,230);
        ctx.lineTo(270,310);
        ctx.lineTo(190,265); 
        ctx.lineTo(280,265);
        ctx.lineTo(200,310);
        ctx.closePath();
        ctx.stroke();
    }
}

module.exports = { returnFunction, mainFunction };