const { Jimp, intToRGBA } = require("jimp");

async function main() {
  const image = await Jimp.read("public/logo/logo.png");
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  let minX = width, maxX = 0, minY = height, maxY = 0;
  
  // The text is in the bottom 30% of the image.
  const startY = Math.floor(height * 0.70);
  
  for (let y = startY; y < height; y++) {
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
  
  console.log(`Text bounding box: minX=${minX}, maxX=${maxX}, minY=${minY}, maxY=${maxY}`);
  console.log(`Text width: ${maxX - minX}, Text height: ${maxY - minY}`);
}

main().catch(console.error);
