const canvas = document.getElementById("canvas");
const msgEl = document.getElementById("msg");
const clearBtn = document.getElementById("clear");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");

const ctx = canvas.getContext("2d");
let shapes = JSON.parse(localStorage.getItem("shapes")) || [];
let points = [];
let isDrawing = false;
let isEditing = false;
let inDrawMode = false;
let inEditMode = false;

let selectedShape = null;
let selectedPointIndex = null;

import {
  renderPreviousShapes,
  generateUniqueId,
  disableButton,
  enableButton,
  findShapeInShapes,
  drawShape,
  isButtonEnabled,
  drawDotsAroundShape,
  getMatchingPoints,
} from "./utils.js";

renderPreviousShapes(ctx, shapes);

canvas.addEventListener("click", handleCanvasClick);
function handleCanvasClick(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (inDrawMode) handleClickDrawing(x, y);
  else if (inEditMode) handleClickEditing(x, y);
  else handleClickSelection(x, y);
}

canvas.addEventListener("mousemove", handleCanvasMove);
function handleCanvasMove(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (isDrawing) handleDrawing(x, y);
  else if (isEditing && selectedShape && selectedPointIndex)
    handleEditing(x, y);
}

clearBtn.addEventListener("click", handleClear);
function handleClear() {
  if (
    window.confirm(
      "Are you sure you want to proceed with this action? All shapes will be deleted",
    )
  ) {
    localStorage.removeItem("shapes");
    shapes = [];
    points = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    msgEl.innerText = "Canvas cleared";
  }
}

startBtn.addEventListener("click", handleStart);
function handleStart(e) {
  if (isButtonEnabled(e)) {
    inDrawMode = true;
    enableButton(stopBtn);
    disableButton(startBtn);
    disableButton(editBtn);
    disableButton(deleteBtn);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderPreviousShapes(ctx, shapes);
  }
}

stopBtn.addEventListener("click", handleStop);
function handleStop(e) {
  if (isButtonEnabled(e)) {
    inDrawMode = false;
    inEditMode = false;
    enableButton(startBtn);
    disableButton(stopBtn);
    disableButton(editBtn);
    disableButton(deleteBtn);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderPreviousShapes(ctx, shapes);
  }
}

editBtn.addEventListener("click", handleEdit);
function handleEdit(e) {
  if (isButtonEnabled(e) && selectedShape) {
    inDrawMode = false;
    inEditMode = true;
    enableButton(stopBtn);
    disableButton(startBtn);
    disableButton(editBtn);
    disableButton(deleteBtn);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderPreviousShapes(ctx, shapes);
    drawDotsAroundShape(ctx, selectedShape);
    msgEl.innerText = `Editing shape: ${selectedShape.id}`;
  }
}

deleteBtn.addEventListener("click", handleDelete);
function handleDelete(e) {
  if (isButtonEnabled(e) && selectedShape) {
    inDrawMode = false;
    shapes = shapes.filter((shape) => shape.id !== selectedShape.id);
    localStorage.setItem("shapes", JSON.stringify(shapes));
    disableButton(editBtn);
    disableButton(deleteBtn);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderPreviousShapes(ctx, shapes);
    msgEl.innerText = `Shape deleted: ${selectedShape.id}`;
    selectedShape = null;
  }
}

function handleClickDrawing(x, y) {
  msgEl.innerText = "";
  points.push({ x, y });
  !isDrawing && (isDrawing = true);
  disableButton(stopBtn);
  renderPreviousShapes(ctx, shapes);
  ctx.beginPath();
  points.forEach((element, index) => {
    if (index === 0) {
      ctx.moveTo(element.x, element.y);
    } else {
      ctx.lineTo(element.x, element.y);
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
      }
    }
  });
  ctx.stroke();
}

function handleClickSelection(x, y) {
  const shape = findShapeInShapes(shapes, x, y);
  if (shape) {
    drawShape(ctx, shape);
    enableButton(editBtn);
    enableButton(deleteBtn);
    selectedShape = shape;
    msgEl.innerText = `Shape selected: ${shape.id}`;
  } else {
    msgEl.innerText = "No shape selected";
  }
}

function handleClickEditing(x, y) {
  if (isEditing && selectedShape) {
    isEditing = false;
    shapes = shapes.map((shape) => {
      if (shape.id === selectedShape.id) {
        return selectedShape;
      }
      return shape;
    });
    localStorage.setItem("shapes", JSON.stringify(shapes));
  } else {
    const matchingPoints = getMatchingPoints(x, y, selectedShape);
    if (matchingPoints) {
      selectedPointIndex = matchingPoints.index;
      isEditing = true;
    }
  }
}

function handleDrawing(x, y) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderPreviousShapes(ctx, shapes);
  ctx.beginPath();
  points.forEach((element, index) => {
    if (index === 0) ctx.moveTo(element.x, element.y);
    else ctx.lineTo(element.x, element.y);
  });
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function handleEditing(x, y) {
  selectedShape.points = selectedShape.points.map((point, index) => {
    if (index == selectedPointIndex) {
      return { x, y };
    }
    return point;
  });
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderPreviousShapes(ctx, shapes);
  drawDotsAroundShape(ctx, selectedShape);
}
