import * as fs from 'fs';
import * as path from 'path';

// Project directory
const src = path.join(__dirname, './src');

// Build directory
const dest = path.join(__dirname, './dist');

// The extensions that will be copied to the build project e.g. ['json', 'proto', 'gql']
const allowedExt: string[] = [];

/**
 * Everything is compiled by tsc no extra help is needed
 * This script is cleaning the dist directory and copy non TS files (rm -rf is not cross-os option)
 */
class Build {
  /**
   * Delete directory recursively
   */
  deleteRecursive(src: string): void {
    if (!fs.existsSync(src)) {
      return;
    }

    fs.readdirSync(src).forEach(file => {
      const curPath = path.join(src, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        this.deleteRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(src);
  }

  /**
   * Copy directory recursively (with extensions filter)
   */
  copyRecursive(src: string, dest: string, allowedExt: string[] = []): void {
    if (!fs.existsSync(src) || allowedExt.length <= 0) {
      return;
    }

    if (fs.lstatSync(src).isDirectory()) {
      fs.mkdirSync(dest, {recursive: true});
      fs.readdirSync(src).forEach(childName => {
        this.copyRecursive(path.join(src, childName), path.join(dest, childName), allowedExt);
      });
    } else {
      if (allowedExt.length > 0) {
        const ext = path.extname(src).substring(1);
        if (allowedExt.indexOf(ext) === -1) {
          return;
        }
      }

      fs.copyFileSync(src, dest);
    }
  }
}

// Run the builder
const builder = new Build();
builder.deleteRecursive(dest);
builder.copyRecursive(src, dest, allowedExt);
