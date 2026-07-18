const { Jimp, intToRGBA } = require("jimp");

async function main() {
  console.log("Reading image...");
  const image = await Jimp.read("public/images/final-map.png");
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  const dots = [];
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = intToRGBA(image.getPixelColor(x, y));
      // Look for the brightest white/yellow center pixels of the city dots
      if (color.r > 230 && color.g > 220 && color.b > 150) {
        dots.push({ x, y });
      }
    }
  }

  const clusters = [];
  for (const dot of dots) {
    let found = false;
    for (const cluster of clusters) {
      const dx = cluster.x - dot.x;
      const dy = cluster.y - dot.y;
      if (Math.sqrt(dx*dx + dy*dy) < 40) { 
        cluster.pixels.push(dot);
        cluster.x = cluster.pixels.reduce((sum, p) => sum + p.x, 0) / cluster.pixels.length;
        cluster.y = cluster.pixels.reduce((sum, p) => sum + p.y, 0) / cluster.pixels.length;
        found = true;
        break;
      }
    }
    if (!found) {
      clusters.push({ x: dot.x, y: dot.y, pixels: [dot] });
    }
  }

  clusters.sort((a, b) => b.pixels.length - a.pixels.length);
  
  console.log(`Image dimensions: ${width}x${height}`);
  for (let i = 0; i < Math.min(15, clusters.length); i++) {
    const c = clusters[i];
    const px = (c.x / width * 100).toFixed(1);
    const py = (c.y / height * 100).toFixed(1);
    console.log(`Cluster ${i+1}: top-[${py}%] left-[${px}%] (pixels: ${c.pixels.length})`);
  }
}

main().catch(console.error);
