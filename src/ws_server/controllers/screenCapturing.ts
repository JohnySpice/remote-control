import Jimp from "jimp";
import robot from "robotjs";

export async function screenCapture() {
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