import robot from 'robotjs';
import { RawData } from 'ws';
import Jimp from 'jimp';

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
    case 'draw_rectangle':
      return drawRectangle(+param1, +param2);
    case 'draw_square':
      return drawRectangle(+param1);
    case 'prnt_scrn':
      return screenCapture();
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

async function screenCapture() {
  const mousePos = robot.getMousePos();
  const length = 200;
  const captureObject = robot.screen.capture(mousePos.x - length, mousePos.y - length, length, length);
  const img = new Jimp({
    "data": captureObject.image,
    "width": captureObject.width,
    "height": captureObject.height
  });
  const buffer = await img.getBufferAsync(Jimp.MIME_PNG);
  return buffer.toString('base64');
}