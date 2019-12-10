// To pick what should be drawn

if (localStorage.getItem("fP") === null) {
    var functionPicker = "0";
    localStorage.setItem("fP", functionPicker);
}
if (localStorage.getItem("checked") === null) {
    localStorage.setItem("checked", false);
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
        spiral();
    }

    if (localStorage.getItem("fP") === "3") {
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
        star();
    }

    if (localStorage.getItem("checked") === "true") {
        document.getElementById("myCheck").checked = true;
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

        ctx.beginPath();
        ctx.moveTo((canvas.width / 2) - 45, (canvas.height / 2) - 45);
        ctx.lineTo((canvas.width / 2) + 75, (canvas.height / 2) - 45);
        ctx.lineTo((canvas.width / 2) + 75, (canvas.height / 2) + 75);
        ctx.lineTo((canvas.width / 2) - 45, (canvas.height / 2) + 75);
        ctx.closePath();

        if (localStorage.getItem("checked") === "true") {
            // Filled Box if checked
            ctx.fill();
        }

        ctx.stroke();
    }
}

const spiral = () => {
    const canvas = document.getElementById('canv');
    var radius = 0;
    var angle = 0;

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = localStorage.getItem("lineWidth");
        // ctx.strokeStyle = "#0096FF"; // blue-ish color (line color)
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);

        for (var n = 0; n < 200; n++) {
            radius += 0.75;
            // make a complete circle every 50 iterations
            angle += (Math.PI * 2) / 50;
            var x = canvas.width / 2 + radius * Math.cos(angle);
            var y = canvas.height / 2 + radius * Math.sin(angle);
            ctx.lineTo(x, y);
        }

        ctx.stroke();
    }
}

const star = () => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = localStorage.getItem("lineWidth");

        ctx.moveTo((canvas.width / 2) - 15, (canvas.height / 2) - 60);
        ctx.lineTo((canvas.width / 2) + 45, (canvas.height / 2) + 70);
        ctx.lineTo((canvas.width / 2) - 100, (canvas.height / 2) - 5);
        ctx.lineTo((canvas.width / 2) + 70, (canvas.height / 2) - 5);
        ctx.lineTo((canvas.width / 2) - 70, (canvas.height / 2) + 70);
        ctx.closePath();

        if (localStorage.getItem("checked") === "true") {
            // Filled Star if checked
            ctx.fill();
        }

        ctx.stroke();
    }
}

module.exports = { returnFunction, mainFunction };