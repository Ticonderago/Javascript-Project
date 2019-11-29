// To pick what should be drawn

if (localStorage.getItem("fP") === null) {
    var functionPicker = "0";
    localStorage.setItem("fP", functionPicker);
}

// functions for the canvas

const mainFunction = (htmlText) => {
    var functionName = "";

    if (htmlText === "Draw") {
        functionPicker = "1";
        functionName = "Draw";
        localStorage.setItem("Draw", functionName)
        localStorage.setItem("fP", functionPicker);
    }

    if (htmlText === "Spiral") {
        functionPicker = "2";
        functionName = "Spiral";
        localStorage.setItem("Spiral", functionName)
        localStorage.setItem("fP", functionPicker);
    }

    if (htmlText === "Star") {
        functionPicker = "3";
        functionName = "Star";
        localStorage.setItem("Star", functionName)
        localStorage.setItem("fP", functionPicker);
    }

    location.reload();
}

const returnFunction = () => {
    if (localStorage.getItem("fP") === "0") {
        initial();
    }

    if (localStorage.getItem("fP") === "1") {
        draw();
    }

    if (localStorage.getItem("fP") === "2") {
        initial();
    }

    if (localStorage.getItem("fP") === "3") {
        draw();
    }
}

// drawing functions
const initial = () => {
    const canvas = document.getElementById('canv');
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = localStorage.getItem("lineWidth");

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
}

const draw = () => {
    const canvas = document.getElementById('canv');
    if (canv.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = localStorage.getItem("lineWidth");
        // Filled triangle
        ctx.beginPath();
        ctx.moveTo(25, 25);
        ctx.lineTo(105, 25);
        ctx.lineTo(25, 105);
        ctx.fill();
    
        // Stroked triangle
        ctx.beginPath();
        ctx.moveTo(125, 125);
        ctx.lineTo(125, 45);
        ctx.lineTo(45, 125);
        ctx.closePath();
        ctx.stroke();
    }
}

module.exports = { returnFunction, mainFunction };