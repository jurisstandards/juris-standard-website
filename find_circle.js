const { Jimp, intToRGBA } = require("jimp");

async function main() {
  const image = await Jimp.read("public/logo/logo.png");
  let minX = 9999, maxX = 0;
  
  // Scan only the top part (the circle)
  for (let y = 0; y < 850; y++) {
    for (let x = 0; x < image.bitmap.width; x++) {
      const color = intToRGBA(image.getPixelColor(x, y));
      if (color.r > 20 || color.g > 20 || color.b > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  console.log(`Circle bounds: minX=${minX}, maxX=${maxX}, width=${maxX - minX}`);
}

main().catch(console.error);
