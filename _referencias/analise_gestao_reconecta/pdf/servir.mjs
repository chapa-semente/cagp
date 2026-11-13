// Servidor de desenvolvimento do montador de PDF (porta 4341), para conferir no navegador.
// Abra http://localhost:4341/?doc=relatorio ou ?doc=boletim.
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(aqui, '../../..');
const doAstro = createRequire(createRequire(path.join(raiz, 'package.json')).resolve('astro/package.json'));
const vite = await import(pathToFileURL(doAstro.resolve('vite')).href);
const servidor = await vite.createServer({ configFile: path.join(aqui, 'vite.config.mjs'), server: { port: 4341, strictPort: true, host: '127.0.0.1' } });
await servidor.listen();
servidor.printUrls();
