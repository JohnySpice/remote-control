import robot from "robotjs";


function drawCircle(radius: number) {
  const { x, y } = robot.getMousePos();
  const centerX = x - radius;
  const centerY = y;
  const step = 2 * Math.PI / 100;
  robot.mouseToggle('down');
  for (let angle = 0; angle < 2 * Math.PI; angle += step) {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY - radius * Math.sin(angle);
    robot.moveMouse(x, y);
  }
  robot.mouseToggle('up');
}

function drawRectangle(width: number, height: number = 0) {
  const step = 1;
  const xLength = width;
  const yLength = height || width;
  robot.mouseToggle('down');
  moveMouseToLength(xLength, 'x', step);
  moveMouseToLength(yLength || width, 'y', step);
  moveMouseToLength(xLength, 'x', -step);
  moveMouseToLength(yLength, 'y', -step);
  robot.mouseToggle('up');
}

function moveMouseToLength(length: number, axios: 'x' | 'y', step: number) {
  for (let i = 0; i < length; i++) {
    const { x: mouseX, y: mouseY } = robot.getMousePos();
    const x = axios === 'x' ? mouseX + step : mouseX;
    const y = axios === 'y' ? mouseY + step : mouseY;
    robot.moveMouse(x, y);
  }
}

export {
  drawCircle,
  drawRectangle
};