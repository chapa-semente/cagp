import fs from 'node:fs';
import path from 'node:path';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const githubRepo = process.env.GITHUB_REPOSITORY || '';
const isUserPage = githubRepo.endsWith('.github.io');
const repoName = githubRepo.split('/')[1] || '';
const basePath = isGitHubActions && repoName && !isUserPage ? `/${repoName}` : '';
const cleanBase = basePath.replace(/\/$/, '');

function getFilesRecursively(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir));
    } else {
      const subPath = '/' + path.relative(baseDir, fullPath).replace(/\\/g, '/');
      const relPath = cleanBase + subPath;
      // Página: guarda só a forma com barra final (/cagp/estagio/), a URL que o site usa.
      // Antes cada página entrava 3 vezes (/x/index.html, /x/ e /x).
      if (relPath.endsWith('/index.html')) {
        results.push(relPath.slice(0, -'index.html'.length));
      } else {
        results.push(relPath);
      }
    }
  }
  return Array.from(new Set(results));
}

const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) {
  // Precache = só o "casco" do app (páginas, JS/CSS, ícones, logos da Semente e fotos do tour).
  // PDFs, fotos e ilustrações entram no cache quando a pessoa abre (cache-first em tempo de execução).
  // Antes o SW baixava os 657 arquivos do site (137 MB) na primeira visita, justamente durante o
  // tour obrigatório: a rede do celular saturava e as trocas de página do tour travavam.
  const SHELL = [
    /\/$/, // páginas
    /^\/_astro\/.+\.(js|css|woff2?)$/,
    /^\/manifest\.webmanifest$/,
    /^\/favicon/,
    /^\/imagens\/pwa\//,
    /^\/logos\/semente\//,
    /^\/images\/chapa\/tour\//,
  ];
  const allFiles = getFilesRecursively(distDir, distDir)
    .filter(f => !f.endsWith('.map') && f !== '/sw.js')
    .filter(f => SHELL.some((re) => re.test(f.slice(cleanBase.length))));
  
  const swSrcPath = path.resolve('public/sw.js');
  const swDistPath = path.resolve('dist/sw.js');
  
  let swContent = '';
  if (fs.existsSync(swSrcPath)) {
    swContent = fs.readFileSync(swSrcPath, 'utf8');
  }
  
  const manifestJson = JSON.stringify(allFiles, null, 2);
  const buildVersion = 'cagp-pwa-v' + Date.now();
  let updatedSw = swContent.replace(
    /const PRECACHE_ASSETS\s*=\s*\[[\s\S]*?\];/,
    `const PRECACHE_ASSETS = ${manifestJson};`
  );
  updatedSw = updatedSw.replace(
    /const CACHE_NAME\s*=\s*['"][^'"]+['"];/,
    `const CACHE_NAME = '${buildVersion}';`
  );
  
  fs.writeFileSync(swDistPath, updatedSw, 'utf8');
  console.log(`[SW-Manifest] Injected ${allFiles.length} precache assets with cache version ${buildVersion} into dist/sw.js`);
} else {
  console.log('[SW-Manifest] dist directory not found, skipping manifest injection.');
}
