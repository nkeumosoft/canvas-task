const canvas = document.getElementById('canvas')
const msgEl = document.getElementById('msg')

const ctx = canvas.getContext('2d')

let isDrawing = false;
let points = [];

// how draw a simple shape with canvas
// ctx.beginPath();
// ctx.moveTo(50, 100);
// ctx.lineTo(150, 100);
// ctx.lineTo(100, 200);
// ctx.lineTo(50, 100);
//      ctx.stroke();

canvas.addEventListener('click', handleCanvasClick);

function handleCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    msgEl.innerText = "";

    // Adding clicked point to the points array
    points.push({ x, y });

    // Setting isDrawing variable to true
    !isDrawing && (isDrawing = true);
   
    ctx.beginPath();
    points.forEach((element, index) => {
        if (index === 0) {
            ctx.moveTo(element.x, element.y);
        }
        else {
            ctx.lineTo(element.x, element.y);

            // Checking if the current clicked point is the same
            // Or close to the initial point
            if (Math.abs(element.x - points[0].x) < 3 &&
                Math.abs(element.y - points[0].y) < 3)
            {
                msgEl.innerText = "Shape is closed";
                points = [];
                isDrawing = false;
            }
        }
    });
    ctx.stroke();
}

canvas.addEventListener('mousemove', handleCanvasMove);

function handleCanvasMove(e) {
    if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Drawing the points in the array
        ctx.beginPath();
        points.forEach((element, index) => {
            if (index === 0) 
                ctx.moveTo(element.x, element.y);
            else
                ctx.lineTo(element.x, element.y);
        });
        ctx.stroke();

        // Drawing the point to follow the mouse movements
        ctx.beginPath();
        ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}