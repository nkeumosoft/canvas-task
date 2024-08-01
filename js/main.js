export const canvas = document.getElementById("canvas");
export const msgEl = document.getElementById("msg");
export const clearBtn = document.getElementById("clear");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");

export const ctx = canvas.getContext("2d");
export let shapes = JSON.parse(localStorage.getItem("shapes")) || [];
export let points = [];
export let isDrawing = false;
export let inDrawMode = false;

let selectedShape = null;

import {
  renderPreviousShapes,
  handleCanvasMove,
  generateUniqueId,
  disableButton,
  enableButton,
  findShapeInShapes,
  drawShape,
  isButtonEnabled,
  Hmm,
} from "./utils.js";

Hmm();

canvas.addEventListener("click", handleCanvasClick);
function handleCanvasClick(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (inDrawMode) handleDrawing(x, y);
  else handleSelection(x, y);
}

canvas.addEventListener("mousemove", handleCanvasMove);

clearBtn.addEventListener("click", handleClear);
function handleClear() {
  localStorage.removeItem("shapes");
  shapes = [];
  points = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  msgEl.innerText = "Canvas cleared";
}

renderPreviousShapes();

startBtn.addEventListener("click", handleStart);
function handleStart(e) {
  if (isButtonEnabled(e)) {
    inDrawMode = true;
    disableButton(startBtn);
    msgEl.innerText = "Started drawing";
  }
}

stopBtn.addEventListener("click", handleStop);
function handleStop(e) {
  if (isButtonEnabled(e)) {
    inDrawMode = false;
    disableButton(stopBtn);
    enableButton(startBtn);
    msgEl.innerText = "Started drawing";
  }
}

editBtn.addEventListener("click", handleEdit);
function handleEdit() {
  inDrawMode = false;
  msgEl.innerText = "Edit mode";
}

deleteBtn.addEventListener("click", handleDelete);
function handleDelete(e) {
  if (isButtonEnabled(e) && selectedShape) {
    inDrawMode = false;
    shapes = shapes.filter((shape) => shape.id !== selectedShape.id);
    localStorage.setItem("shapes", JSON.stringify(shapes));
    selectedShape = null;
    disableButton(editBtn);
    disableButton(deleteBtn);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderPreviousShapes();
    msgEl.innerText = "Shape deleted";
  }
}

function handleDrawing(x, y) {
  msgEl.innerText = "";

  // Adding clicked point to the points array
  points.push({ x, y });

  // Setting isDrawing variable to true
  !isDrawing && (isDrawing = true);
  disableButton(stopBtn);

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
        shapes.push({ points: [...points], id: generateUniqueId() });
        localStorage.setItem("shapes", JSON.stringify(shapes));
        points = [];
        isDrawing = false;
        enableButton(stopBtn);
        msgEl.innerText = "Shape is closed";

        // ctx.closePath();
        // ctx.fillStyle = 'red';
        // ctx.fill();
      }
    }
  });
  ctx.stroke();
}

function handleSelection(x, y) {
  const shape = findShapeInShapes(shapes, x, y);
  if (shape) {
    drawShape(shape);
    enableButton(editBtn);
    enableButton(deleteBtn);
    selectedShape = shape;
    msgEl.innerText = `Shape selected: ${shape.id}`;
  } else {
    msgEl.innerText = "No shape selected";
  }
}
