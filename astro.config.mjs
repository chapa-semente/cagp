// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

// Detecta automaticamente se o build está rodando no GitHub Actions para ajustar o base path
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const githubRepo = process.env.GITHUB_REPOSITORY || ''; // ex: "gsathler-vi/cagp"
const isUserPage = githubRepo.endsWith('.github.io');
const repoName = githubRepo.split('/')[1] || '';

// Diretiva client:sinal="nome": a ilha React só hidrata quando a central de sinais do BaseLayout
// avisa (src/lib/astro/clientSinal.ts). É o que tira o React do carregamento de toda página.
const ilhasSobDemanda = {
  name: 'cagp-ilhas-sob-demanda',
  hooks: {
    'astro:config:setup': ({ addClientDirective }) => {
      addClientDirective({ name: 'sinal', entrypoint: fileURLToPath(new URL('./src/lib/astro/clientSinal.ts', import.meta.url)) });
    },
  },
};

// https://astro.build/config
export default defineConfig({
  output: 'static',
  outDir: './dist',
  // O domínio entra nas prévias de link (og:image precisa de endereço absoluto). Fora do GitHub
  // Actions, usa o endereço que o Netlify informa (URL), quando existir.
  site: isGitHubActions && githubRepo
    ? `https://${githubRepo.split('/')[0]}.github.io`
    : process.env.URL || 'https://cagp-ufmg.github.io',
  base: isGitHubActions && repoName && !isUserPage
    ? `/${repoName}`
    : '/',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    ssr: {
      noExternal: [
        'vaul',
        'cmdk',
        'radix-ui',
        'sonner',
        'recharts',
        'lucide-react',
        'embla-carousel-react',
        'input-otp',
        'react-day-picker',
        'react-resizable-panels',
        'motion',
        '@headlessui/react',
      ],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@astrojs/react/client.js',
      ],
    },
  },
  // Rotas renomeadas no Modelo B de navegação.
  redirects: {
    '/estagio-tcc': '/formatura',
  },
  integrations: [react(), mdx(), ilhasSobDemanda],
});
