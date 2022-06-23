import robot from "robotjs";


function drawCircle(radius: number) {
  const mousePos = robot.getMousePos();
  const centerX = mousePos.x - radius;
  const centerY = mousePos.y;
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
    const mousePos = robot.getMousePos();
    const x = axios === 'x' ? mousePos.x + step : mousePos.x;
    const y = axios === 'y' ? mousePos.y + step : mousePos.y;
    robot.moveMouse(x, y);
  }
}

export {
  drawCircle,
  drawRectangle
};