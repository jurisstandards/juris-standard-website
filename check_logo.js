const { Jimp } = require("jimp");

async function main() {
  console.log("Reading logo...");
  const image = await Jimp.read("public/logo/logo.png");
  console.log(`Dimensions: ${image.bitmap.width} x ${image.bitmap.height}`);
}

main().catch(console.error);
