import { glob } from "glob";
import { exec } from "child_process";

glob("src/*.html").then(files => {
  files.forEach(file => {
    const output = file.replace("src", "dist");
    const cmd = `html-minifier-terser ${file} -o ${output} --collapse-whitespace --remove-comments --minify-css true --minify-js true`;
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Failed to minify ${file}:`, stderr);
      } else {
        console.log(`✅ Minified ${file}`);
      }
    });
  });
});
