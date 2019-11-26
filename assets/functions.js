const mainFunction = (htmlText) => {
    if (htmlText === "Draw") {
        returnFunction = draw;
        location.reload();
    }
    if (htmlText === "root") {
        return undefined;
    }
}

const returnFunction = () => {
    const canvas = document.getElementById('canv');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
}

const draw = () => {
    const canvas = document.getElementById('canv');
    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
    
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