export function renderPreviousShapes(ctx, shapes) {
  shapes.forEach((shape) => {
    ctx.beginPath();
    shape.points.forEach((element, index) => {
      if (index === 0) ctx.moveTo(element.x, element.y);
      else ctx.lineTo(element.x, element.y);
    });
    ctx.stroke();
  });
}

export function TestCode() {
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

export function generateUniqueId() {
  return "id-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}

export function disableButton(button) {
  button.classList.add("disabled");
  button.classList.remove("button");
}

export function enableButton(button) {
  button.classList.remove("disabled");
  button.classList.add("button");
}

export function findShapeInShapes(shapes, x, y) {
  let shapeFound = null;
  shapes.forEach((shape) => {
    shape.points.forEach((element) => {
      if (Math.abs(element.x - x) < 5 && Math.abs(element.y - y) < 5) {
        shapeFound = shape;
        return shapeFound;
      }
    });
  });
  return shapeFound;
}

export function drawShape(ctx, shape) {
  ctx.beginPath();
  shape.points.forEach((element, index) => {
    if (index === 0) ctx.moveTo(element.x, element.y);
    else ctx.lineTo(element.x, element.y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(173, 216, 230, 0.2)";
  ctx.fill();
  ctx.stroke();
}

export function isButtonEnabled(e) {
  const button = e.target;
  return button.classList.contains("button");
}
