import { ctx, shapes, isDrawing, canvas, points } from "./main.js";

export function renderPreviousShapes() {
  shapes.forEach((shape) => {
    ctx.beginPath();
    shape.points.forEach((element, index) => {
      if (index === 0) ctx.moveTo(element.x, element.y);
      else ctx.lineTo(element.x, element.y);
    });
    ctx.stroke();
  });
}

export function handleCanvasMove(e) {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rendering previous shapes
    renderPreviousShapes();

    // Drawing the points in the array
    ctx.beginPath();
    points.forEach((element, index) => {
      if (index === 0) ctx.moveTo(element.x, element.y);
      else ctx.lineTo(element.x, element.y);
    });
    ctx.stroke();

    // Drawing the point to follow the mouse movements
    ctx.beginPath();
    ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

export function Hmm() {
  // how draw a simple shape with canvas
  // ctx.beginPath();
  // ctx.moveTo(50, 100);
  // ctx.lineTo(150, 100);
  // ctx.lineTo(100, 200);
  // ctx.lineTo(50, 100);
  //      ctx.stroke();
  // working with arcs
  // ctx.beginPath();
  // ctx.arc(200, 200, 50, 0, Math.PI * 1.25);
  // ctx.closePath()
  // ctx.fill()
  // ctx.stroke();

  console.log("Hi ya'll");
}
