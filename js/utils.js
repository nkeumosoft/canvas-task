export function renderPreviousShapes(ctx, shapes) {
  shapes.forEach((shape) => {
    ctx.beginPath();
    shape.points.forEach((element, index) => {
      if (index === 0) ctx.moveTo(element.x, element.y);
      else ctx.lineTo(element.x, element.y);
    });
    ctx.closePath();
    ctx.stroke();
  });
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
      if (Math.abs(element.x - x) < 6 && Math.abs(element.y - y) < 6) {
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

export function drawDotsAroundShape(ctx, shape) {
  ctx.beginPath();
  shape.points.forEach((element) => {
    ctx.moveTo(element.x, element.y);
    ctx.arc(element.x, element.y, 3, 0, Math.PI * 2);
  });
  ctx.fillStyle = "black";
  ctx.fill();
}

export function getMatchingPoints(x, y, shape) {
  let matchingPoints = null;
  shape.points.forEach((element, index) => {
    if (Math.abs(element.x - x) < 6 && Math.abs(element.y - y) < 6) {
      matchingPoints = { x: element.x, y: element.y, index };
      return matchingPoints;
    }
  });
  return matchingPoints;
}
