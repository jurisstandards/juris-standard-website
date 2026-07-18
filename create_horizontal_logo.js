const { Jimp, rgbaToInt, intToRGBA } = require("jimp");

async function main() {
  console.log("Loading original logo...");
  const src = await Jimp.read("public/logo/logo.png");
  
  // Crop the circle
  console.log("Extracting circle...");
  const circle = src.clone().crop({ x: 250, y: 90, w: 750, h: 750 });
  
  // Crop the text
  console.log("Extracting text...");
  const text = src.clone().crop({ x: 75, y: 890, w: 1115, h: 215 });
  
  // Create new horizontal canvas
  console.log("Composing new horizontal logo...");
  const gap = 100;
  const newWidth = circle.bitmap.width + gap + text.bitmap.width;
  const newHeight = Math.max(circle.bitmap.height, text.bitmap.height);
  
  // Create a new solid black image
  const finalLogo = new Jimp({ width: newWidth, height: newHeight, color: 0x000000FF });
  
  // Composite circle on the left
  finalLogo.composite(circle, 0, 0);
  
  // Composite text on the right, vertically centered
  const textY = Math.floor((newHeight - text.bitmap.height) / 2);
  finalLogo.composite(text, circle.bitmap.width + gap, textY);
  
  // Optional: Convert pure black to transparent
  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const color = intToRGBA(finalLogo.getPixelColor(x, y));
      if (color.r < 5 && color.g < 5 && color.b < 5) {
        finalLogo.setPixelColor(rgbaToInt(0, 0, 0, 0), x, y);
      }
    }
  }
  
  await finalLogo.write("public/logo/logo-horizontal.png");
  console.log("Successfully created public/logo/logo-horizontal.png");
}

main().catch(console.error);
