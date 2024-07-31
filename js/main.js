export const canvas = document.getElementById("canvas");
export const msgEl = document.getElementById("msg");
export const clearBtn = document.getElementById("clear");


export const ctx = canvas.getContext("2d");
export let shapes = JSON.parse(localStorage.getItem("shapes")) || [];
export let points = [];
export let isDrawing = false;

import { renderPreviousShapes, handleCanvasMove, Hmm } from "./utils.js";

Hmm();

canvas.addEventListener("click", handleCanvasClick);
function handleCanvasClick(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  msgEl.innerText = "";

  // Adding clicked point to the points array
  points.push({ x, y });

  // Setting isDrawing variable to true
  !isDrawing && (isDrawing = true);

  // Rendering previous shapes
  renderPreviousShapes();

  ctx.beginPath();
  points.forEach((element, index) => {
    if (index === 0) {
      ctx.moveTo(element.x, element.y);
    } else {
      ctx.lineTo(element.x, element.y);

      // Checking if the current clicked point is the same
      // Or close to the initial point
      if (
        Math.abs(element.x - points[0].x) < 3 &&
        Math.abs(element.y - points[0].y) < 3
      ) {
        shapes.push({ points: [...points] });
        localStorage.setItem("shapes", JSON.stringify(shapes));
        points = [];
        isDrawing = false;
        msgEl.innerText = "Shape is closed";

        // ctx.closePath();
        // ctx.fillStyle = 'red';
        // ctx.fill();
      }
    }
  });
  ctx.stroke();
}

canvas.addEventListener("mousemove", handleCanvasMove);

clearBtn.addEventListener("click", handleClear);
function handleClear(e) {
  localStorage.removeItem("shapes");
  shapes = [];
  points = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  msgEl.innerText = "Canvas cleared";
}

renderPreviousShapes();
