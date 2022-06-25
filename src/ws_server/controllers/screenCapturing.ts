import Jimp from "jimp";
import robot from "robotjs";

export async function screenCapture() {
  const { x, y } = robot.getMousePos();
  const length = 200;
  const offsetToZero = length / 2;
  const captureObject = robot.screen.capture(x - offsetToZero, y - offsetToZero, length, length);
  const img = new Jimp({
    "data": captureObject.image,
    "width": captureObject.width,
    "height": captureObject.height
  });
  for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
      const index = (y * captureObject.byteWidth) + (x * captureObject.bytesPerPixel);
      const r = captureObject.image[index];
      const g = captureObject.image[index + 1];
      const b = captureObject.image[index + 2];
      const num = (r * 256) + (g * 256 * 256) + (b * 256 * 256 * 256) + 255;
      img.setPixelColor(num, x, y);
    }
  }
  const buffer = await img.getBufferAsync(Jimp.MIME_PNG);
  return buffer.toString('base64');
}