
// Author: Verónica García Gayol
// Date: January 5, 2024

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const bgColor = "#eaeaea";
const lineColor = "#333333";
const limit = 25;
const totalBaseSquares = random.rangeFloor(limit, limit*3);

let lineWidth;


const sketch = ({ context, width, height }) => {
  
  context.fillStyle = "#333333";
  context.fillRect(0, 0, width, height);

  return ({ context, width, height }) => {
    
    for(let i = totalBaseSquares; i >= 1; i--){
      
      lineWidth = random.rangeFloor(0, limit/2);
      drawSquares(context, width, height, i);

    }

  };
};

// Function to draw squares
const drawSquares = (ctx, w, h, index) => {

  const fw = w;
  const fh = h;
  const gap = (fw - lineWidth * 2 * index )  / totalBaseSquares;
  const size = gap * index;
  const ds = size * Math.sqrt(2);
  let angle, cx, cy;

  // Check if the square fits within the canvas
  if(ds < w){ 

    // Determine angle, x, and y position based on whether the index is even or odd
    if( isPar(index % 2) ){ 
      angle = 45;
      cx = (w/2 - ds/2) + ds/2;
      cy = (fh/2 - ds/2);

    } else {
      angle = 0;
      cx = (fw/2 - size/2);
      cy = (fh/2 - size/2);
    }

    ctx.save();
      ctx.lineWidth   = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.translate(cx,  cy);
      ctx.rotate(math.degToRad(angle));
      ctx.translate(-cx, -cy);
      ctx.rect(cx, cy, size, size);
      ctx.fill();
      ctx.stroke();
    ctx.restore();

  }

};

// Function to check if a number is even
const isPar = (number) => {
  return number % 2 == 0;
}


canvasSketch(sketch, settings);
