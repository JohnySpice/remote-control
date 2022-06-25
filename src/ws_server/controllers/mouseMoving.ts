import robot from 'robotjs';

function moveVertical(offset: number) {
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x, y + offset);
}

function moveHorizontal(offset: number) {
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x + offset, y);
}

function getMousePosition() {
  const { x, y } = robot.getMousePos();
  return `${x},${y}`;
}

export {
  moveHorizontal,
  moveVertical,
  getMousePosition
};