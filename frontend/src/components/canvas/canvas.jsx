import React from "react";

class Canvas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            spiral: false
        }

        this.draw = this.draw.bind(this);
    }
    
    componentDidMount() {
        this.draw();
    }

    draw() {
        const canvas = document.getElementById('canv');
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);
    }

    render() {

        return (
            <div className="canvas-back">
                <canvas id="canv" width="575" height="575"></canvas>
                {/* <button>Draw</button>   turn this into a form */}
            </div>
        );
    }
}

export default Canvas;