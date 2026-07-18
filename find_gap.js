const { Jimp, intToRGBA } = require("jimp");

async function main() {
  const image = await Jimp.read("public/logo/logo.png");
  const width = image.bitmap.width;
  
  // From y=850 to y=1100, calculate row brightness
  for (let y = 850; y < 1100; y += 5) {
    let brightness = 0;
    for (let x = 0; x < width; x++) {
      const color = intToRGBA(image.getPixelColor(x, y));
      brightness += color.r + color.g + color.b;
    }
    console.log(`y=${y}: ${brightness > 5000 ? "###" : "."}`);
  }
}

main().catch(console.error);
