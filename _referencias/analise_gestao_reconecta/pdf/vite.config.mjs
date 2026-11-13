// Monta os PDFs do boletim e do relatório com os componentes React e o CSS do site, sem criar rota nele.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(aqui, '../../..');
const src = path.join(raiz, 'src');

/** Responde /espera depois de 3,5 s com uma imagem de 1 pixel (ver index.html). */
const espera = {
  name: 'espera-antes-de-imprimir',
  configureServer(s) { s.middlewares.use('/espera', atrasar); },
  configurePreviewServer(s) { s.middlewares.use('/espera', atrasar); },
};
function atrasar(_req, res) {
  setTimeout(() => {
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-store');
    res.end(Buffer.from('R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', 'base64'));
  }, 3500);
}

export default {
  root: aqui,
  base: './',
  publicDir: false,
  plugins: [tailwindcss(), espera],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: /^@boldkit\/hooks\//, replacement: `${src}/hooks/` },
      { find: /^@boldkit\//, replacement: `${src}/components/boldkit/` },
      { find: /^@hooks\//, replacement: `${src}/hooks/` },
      { find: /^@components\//, replacement: `${src}/components/` },
      { find: /^@lib\//, replacement: `${src}/lib/` },
      { find: /^@styles\//, replacement: `${src}/styles/` },
      { find: /^next\/link$/, replacement: `${src}/lib/link.tsx` },
      { find: /^@\//, replacement: `${src}/` },
    ],
  },
  server: { fs: { allow: [raiz] } },
  build: { outDir: path.join(aqui, 'dist'), emptyOutDir: true, chunkSizeWarningLimit: 4000 },
};
