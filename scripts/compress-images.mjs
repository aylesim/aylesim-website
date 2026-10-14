import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageExtension = /\.(png|jpg)$/;
const output = "public/media";
await fs.mkdir(output, { recursive: true });
const files = (await fs.readdir("public")).filter((name) =>
  imageExtension.test(name)
);
for (const file of files) {
  const name = path.parse(file).name;
  const input = path.join("public", file);
  let full;
  for (const quality of [76, 65, 54, 42]) {
    full = await sharp(input)
      .rotate()
      .resize({
        width: 1600,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality })
      .toBuffer();
    if (full.length <= 450_000) {
      break;
    }
  }
  await fs.writeFile(`${output}/${name}.webp`, full);
  await sharp(input)
    .rotate()
    .resize(800, 500, {
      fit: "contain",
      background: "#000",
      withoutEnlargement: true,
    })
    .webp({ quality: 76 })
    .toFile(`${output}/${name}-thumb.webp`);
  const { size } = await fs.stat(`${output}/${name}.webp`);
  if (size > 500_000) {
    throw new Error(`${file}: compressed image exceeds 500 KB (${size} bytes)`);
  }
  console.log(`${file}: ${Math.round(size / 1024)} KB`);
}
