import { glob } from "glob";
import esbuild from "esbuild";

glob("src/*.js").then(files => {
  for (const file of files) {
    const outfile = file.replace("src", "dist");
    esbuild.buildSync({
      entryPoints: [file],
      outfile,
      bundle: true,
      minify: true,
    });
    console.log(`✅ Built ${file}`);
  }
});
