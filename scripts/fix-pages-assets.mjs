import {readdir,readFile,writeFile,access} from 'node:fs/promises';
import path from 'node:path';
const directory=process.argv[2]||'dist/client';
const assets=path.join(directory,'assets');
for(const name of await readdir(assets)){
 if(!name.endsWith('.js'))continue;
 const file=path.join(assets,name),source=await readFile(file,'utf8');
 const fixed=source.replace(/(["'`])\/assets\//g,'$1./assets/');
 for(const match of fixed.matchAll(/["'`]\.\/assets\/([^"'`]+)["'`]/g))await access(path.join(assets,match[1]));
 if(fixed!==source)await writeFile(file,fixed);
}
console.log('GitHub Pages device asset paths verified.');
