// Diretiva própria do site (astro.config.mjs › ilhasSobDemanda).
import 'astro';

declare module 'astro' {
  interface AstroClientDirectives {
    /** Hidrata a ilha quando a central de sinais do BaseLayout dá este sinal. */
    'client:sinal'?: string;
  }
}
