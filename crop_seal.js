const { Jimp, intToRGBA } = require("jimp");

async function main() {
  console.log("Reading logo.png...");
  const image = await Jimp.read("public/logo/logo.png");
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;
  
  // Scan the top 85% of the image
  const scanHeight = Math.floor(height * 0.85);
  
  for (let y = 0; y < scanHeight; y++) {
    for (let x = 0; x < width; x++) {
      const color = intToRGBA(image.getPixelColor(x, y));
      if (color.r > 20 || color.g > 20 || color.b > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  // The seal is a perfect circle, so it should be a perfect square box.
  // The horizontal bounds (minX, maxX) are usually perfectly accurate for a centered logo.
  const sealWidth = maxX - minX;
  const centerX = minX + sealWidth / 2;
  
  // For the Y axis, since we might have hit some text below, it's safer to just 
  // assume the height is exactly equal to the width, starting from minY.
  const size = sealWidth;
  
  let cropX = Math.floor(centerX - size / 2);
  let cropY = minY; // Start exactly at the top of the non-black pixels
  
  // Clamp to image boundaries
  if (cropX < 0) cropX = 0;
  if (cropY < 0) cropY = 0;
  let finalSize = size;
  if (cropX + finalSize > width) finalSize = width - cropX;
  if (cropY + finalSize > height) finalSize = height - cropY;
  
  console.log(`Cropping to: x=${cropX}, y=${cropY}, w=${finalSize}, h=${finalSize}`);
  
  image.crop({ x: cropX, y: cropY, w: finalSize, h: finalSize });
  
  // Save the tightly cropped seal
  await image.write("public/logo/seal-logo.png");
  console.log("Successfully saved perfectly centered seal-logo.png");
}

main().catch(console.error);
