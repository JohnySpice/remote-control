import robot from 'robotjs';
import { RawData } from 'ws';

export function handler(message: RawData) {
  const [command, param1, param2] = message.toString().split(' ');
  switch (command) {
    case 'mouse_up':
      return moveVertical(-param1);
    case 'mouse_down':
      return moveVertical(+param1);
    case 'mouse_left':
      return moveHorizontal(-param1);
    case 'mouse_right':
      return moveHorizontal(+param1);
    case 'mouse_position':
      return getMousePosition();
    case 'draw_circle':
      return drawCircle(+param1);
  }
}

function moveVertical(y = 0, x = 0) {
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x + x, mousePos.y + y);
}

function moveHorizontal(x = 0, y = 0) {
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x + x, mousePos.y + y);
}

function getMousePosition() {
  const mousePos = robot.getMousePos();
  return `${mousePos.x},${mousePos.y}`;
}

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