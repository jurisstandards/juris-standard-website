const { Jimp, intToRGBA } = require("jimp");

async function main() {
  const image = await Jimp.read("public/logo/logo.png");
  
  // Text bounding box was minX=82, maxX=1184, minY=896, maxY=1099
  // The main text "JURIS STANDARD" is roughly minY=896 to maxY=1000.
  // We scan columns from X=400 to X=800 to find the empty space between words.
  let bestGapX = -1;
  let maxEmptyCols = 0;
  let currentEmptyCols = 0;
  let gapStart = -1;
  
  for (let x = 400; x < 800; x++) {
    let hasPixel = false;
    for (let y = 890; y < 1010; y++) {
      const color = intToRGBA(image.getPixelColor(x, y));
      if (color.r > 20 || color.g > 20 || color.b > 20) {
        hasPixel = true;
        break;
      }
    }
    if (!hasPixel) {
      if (currentEmptyCols === 0) gapStart = x;
      currentEmptyCols++;
    } else {
      if (currentEmptyCols > maxEmptyCols) {
        maxEmptyCols = currentEmptyCols;
        bestGapX = gapStart + Math.floor(currentEmptyCols / 2);
      }
      currentEmptyCols = 0;
    }
  }
  
  console.log(`Gap center X: ${bestGapX}, width: ${maxEmptyCols}`);
}

main().catch(console.error);
