// autoConvertImages.js
const fs = require("fs");
const path = require("path");

// Folders to process
const foldersToProcess = ["pages", "components"];

// Recursively get all .js and .tsx files
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (file.endsWith(".js") || file.endsWith(".tsx")) {
      results.push(filePath);
    }
  });
  return results;
}

// Convert <img> to <Image>
function convertImgTags(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Only proceed if there is <img
  if (!content.includes("<img")) return;

  content = content.replace(/<img\s+([^>]+?)\/?>/g, (match, attrs) => {
    let newAttrs = attrs
      // class → className
      .replace(/\bclass="/g, 'className="')
      // src → prepend /amelia_portfolio if missing
      .replace(/\bsrc="(\/?images\/[^"]+)"/g, (m, src) => {
        if (src.startsWith("/amelia_portfolio")) return `src="${src}"`;
        return `src="/amelia_portfolio${src}"`;
      })
      // width and height → wrap in {}
      .replace(/\b(width|height)="(\d+)"/g, '$1={$2}');

    return `<Image ${newAttrs} />`;
  });

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Converted images in ${filePath}`);
}

// Main
foldersToProcess.forEach((folder) => {
  const folderPath = path.join(__dirname, folder);
  if (!fs.existsSync(folderPath)) return;

  const files = getFiles(folderPath);
  files.forEach(convertImgTags);
});

console.log("🎉 All done!");