
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 150;

let painting = false;
let color = '#000000';
let brushSize = 5;

const startPosition = (e) => {
  painting = true;
  draw(e);
};

const endPosition = () => {
  painting = false;
  ctx.beginPath();
};

const draw = (e) => {
  if (!painting) return;

  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
};

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

document.getElementById('clearBtn').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('colorPicker').addEventListener('change', (e) => {
  color = e.target.value;
});

document.getElementById('brushSize').addEventListener('input', (e) => {
  brushSize = e.target.value;
});

const addCustomColor = (color) => {
  const colorBox = document.createElement('div');
  colorBox.classList.add('color-box');
  colorBox.style.backgroundColor = color;
  colorBox.addEventListener('click', () => {
    document.getElementById('colorPicker').value = color;
    color = color;
  });
  document.getElementById('customColors').appendChild(colorBox);
};

document.getElementById('addColorBtn').addEventListener('click', () => {
  const customColor = document.getElementById('colorPicker').value;
  addCustomColor(customColor);
});