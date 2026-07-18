const { Jimp, rgbaToInt, intToRGBA } = require("jimp");

async function main() {
  console.log("Loading original logo...");
  const src = await Jimp.read("public/logo/logo.png");
  
  console.log("Extracting parts...");
  const circle = src.clone().crop({ x: 250, y: 90, w: 750, h: 750 });
  const juris = src.clone().crop({ x: 80, y: 885, w: 380, h: 120 });
  const standard = src.clone().crop({ x: 480, y: 885, w: 710, h: 120 });
  const subline = src.clone().crop({ x: 100, y: 1035, w: 1080, h: 65 });
  const targetWidth = 1200;
  
  console.log("Resizing parts...");
  const jurisHeight = Math.floor(juris.bitmap.height * (targetWidth / juris.bitmap.width));
  juris.resize({ w: targetWidth, h: jurisHeight });
  
  const standardHeight = Math.floor(standard.bitmap.height * (targetWidth / standard.bitmap.width));
  standard.resize({ w: targetWidth, h: standardHeight });
  
  const sublineHeight = Math.floor(subline.bitmap.height * (targetWidth / subline.bitmap.width));
  subline.resize({ w: targetWidth, h: sublineHeight });
  
  const gap = 25; // Gap between text lines
  const textHeight = juris.bitmap.height + gap + standard.bitmap.height + gap + subline.bitmap.height;
  
  const circleGap = 120; // Gap between circle and text block
  const newWidth = circle.bitmap.width + circleGap + targetWidth;
  const newHeight = Math.max(circle.bitmap.height, textHeight);
  
  console.log("Composing final image...");
  const finalLogo = new Jimp({ width: newWidth, height: newHeight, color: 0x000000FF });
  
  // Vertically center the circle and text block
  const circleY = Math.floor((newHeight - circle.bitmap.height) / 2);
  finalLogo.composite(circle, 0, circleY);
  
  const textStartX = circle.bitmap.width + circleGap;
  let currentY = Math.floor((newHeight - textHeight) / 2);
  
  finalLogo.composite(juris, textStartX, currentY);
  currentY += juris.bitmap.height + gap;
  
  finalLogo.composite(standard, textStartX, currentY);
  currentY += standard.bitmap.height + gap;
  
  finalLogo.composite(subline, textStartX, currentY);
  
  console.log("Applying transparency...");
  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const color = intToRGBA(finalLogo.getPixelColor(x, y));
      if (color.r < 10 && color.g < 10 && color.b < 10) {
        finalLogo.setPixelColor(rgbaToInt(0, 0, 0, 0), x, y);
      }
    }
  }
  
  await finalLogo.write("public/logo/logo-horizontal-stacked.png");
  console.log("Saved public/logo/logo-horizontal-stacked.png");
}

main().catch(console.error);
