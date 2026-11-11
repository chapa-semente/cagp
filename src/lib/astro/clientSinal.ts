// client:sinal="nome" — ilha React que só carrega quando o site avisa que ela é necessária.
//
// A moldura do site (cabeçalho, trilho, barra) é HTML e JS puro. As folhas, a busca, os tours e a
// pílula continuam em React, mas ficam dormindo: nenhum byte de React é baixado enquanto ninguém
// abre uma delas. Quem acorda cada ilha é a "central de sinais" do BaseLayout
// (window.__cagpSinal('folhas'), por exemplo). O sinal pode chegar antes ou depois de a ilha
// existir na página: os já dados ficam anotados em window.__cagpSinais.
import type { ClientDirective } from 'astro';

type SinalWindow = Window & { __cagpSinais?: Record<string, number> };

const sinalDirective: ClientDirective = (load, options) => {
  const nome = String(options.value);
  let started = false;
  const hydrate = async () => {
    if (started) return;
    started = true;
    window.removeEventListener('cagp:sinal', onSinal);
    const run = await load();
    await run();
  };
  const onSinal = (event: Event) => {
    if ((event as CustomEvent<string>).detail === nome) void hydrate();
  };
  if ((window as SinalWindow).__cagpSinais?.[nome]) void hydrate();
  else window.addEventListener('cagp:sinal', onSinal);
};

export default sinalDirective;
