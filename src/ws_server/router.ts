import { RawData } from 'ws';
import { drawCircle, drawRectangle, getMousePosition, moveHorizontal, moveVertical, screenCapture } from './controllers';

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