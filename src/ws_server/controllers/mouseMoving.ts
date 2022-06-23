import robot from 'robotjs';

function moveVertical(y: number) {
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x, mousePos.y + y);
}

function moveHorizontal(x: number) {
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x + x, mousePos.y);
}

function getMousePosition() {
  const mousePos = robot.getMousePos();
  return `${mousePos.x},${mousePos.y}`;
}

export {
  moveHorizontal,
  moveVertical,
  getMousePosition
};