// src/components/features/pwa/InstalarNaTela.tsx — "Deixe o site na tela inicial do celular".
//
// A recomendação explícita de instalar (13/11/2026). É HTML pronto: renderizado no build, sem
// hidratar. Quem liga o bloco ao aparelho é src/scripts/instalarNaTela.ts, que escolhe UM caminho:
//   toque     o navegador ofereceu instalar (Chrome, Edge, Samsung no Android): um botão resolve;
//   ios       iPhone: o passo a passo do Safari (o iPhone não deixa site nenhum instalar sozinho);
//   android   Android sem o aviso (Firefox, link aberto pelo WhatsApp): o passo a passo do menu;
//   embutido  navegador de dentro do Instagram e afins: primeiro abrir no navegador do celular;
//   geral     computador ou sem JavaScript: os dois caminhos em texto;
//   pronto    o site já está aberto pela tela inicial.
// Estilo em src/styles/instalar.css. Dono da função (DESIGN.md › The One Owner Rule): este bloco,
// em /sobre-o-site#tela-inicial; a home mostra o mesmo bloco, recolhido e só no celular.

import React from 'react';
import { asset } from '@/lib/paths';
import '@/styles/instalar.css';

/** Miolo Phosphor Bold dos três ícones que os menus do celular mostram (grid 256). */
const ICONE = {
  compartilhar:
    'M220,112v96a20,20,0,0,1-20,20H56a20,20,0,0,1-20-20V112A20,20,0,0,1,56,92H76a12,12,0,0,1,0,24H60v88H196V116H180a12,12,0,0,1,0-24h20A20,20,0,0,1,220,112ZM96.49,72.49,116,53v83a12,12,0,0,0,24,0V53l19.51,19.52a12,12,0,1,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,1,0,17,17Z',
  adicionar:
    'M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28Zm-4,176H52V52H204ZM76,128a12,12,0,0,1,12-12h28V88a12,12,0,0,1,24,0v28h28a12,12,0,0,1,0,24H140v28a12,12,0,0,1-24,0V140H88A12,12,0,0,1,76,128Z',
  pontinhos:
    'M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z',
} as const;

const Glifo: React.FC<{ nome: keyof typeof ICONE }> = ({ nome }) => (
  <svg className="cagp-instalar-glifo" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d={ICONE[nome]} />
  </svg>
);

const Passos: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ol className="cagp-instalar-passos" role="list">
    {children}
  </ol>
);

export const InstalarNaTela: React.FC<{
  /** `home`: recolhido, só no celular, com "Agora não". `pagina`: sempre à vista e aberto. */
  onde: 'home' | 'pagina';
}> = ({ onde }) => {
  const naHome = onde === 'home';
  return (
    <section
      id="tela-inicial"
      className="cagp-instalar"
      aria-labelledby="instalar-titulo"
      data-instalar={onde}
      data-instalar-modo="geral"
      // Na home o bloco só aparece quando o script confirma que é celular e que ainda não foi instalado.
      hidden={naHome}
    >
      <span className="sk-adesivo cagp-instalar-adesivo">Recomendado</span>

      <div className="cagp-instalar-topo">
        {/* A tela do celular com o ícone no lugar: é assim que o site fica depois de salvo. */}
        <div className="cagp-instalar-celular" aria-hidden="true">
          <span className="cagp-instalar-vago" />
          <span className="cagp-instalar-vago" />
          <span className="cagp-instalar-vago" />
          <span className="cagp-instalar-app">
            <img src={asset('/logos/semente/semente-simbolo.webp')} alt="" width="40" height="40" loading="lazy" decoding="async" />
          </span>
          <span className="cagp-instalar-vago" />
          <span className="cagp-instalar-vago" />
        </div>
        <div className="cagp-instalar-texto">
          <h2 id="instalar-titulo">Deixe o site na tela inicial do celular</h2>
          <p>
            Abre com um toque, como aplicativo, e funciona sem sinal. Faça agora, pra ele já estar lá quando você precisar.
          </p>
        </div>
      </div>

      <div className="cagp-instalar-acoes">
        <button type="button" className="sk-btn sk-btn-roxo" data-instalar-so="toque" data-instalar-agora hidden>
          <i className="bi bi-phone" aria-hidden="true" />
          Pôr na tela inicial
        </button>

        <p className="cagp-instalar-pronto" data-instalar-so="pronto" role="status" hidden>
          <i className="bi bi-check2-circle" aria-hidden="true" />
          <span data-instalar-pronto-texto>Pronto: você já está usando o site pela tela inicial.</span>
        </p>

        <details className="cagp-instalar-como" data-instalar-so="ios android embutido geral" open={!naHome}>
          <summary className="sk-btn sk-btn-roxo">
            <i className="bi bi-phone" aria-hidden="true" />
            Ver o passo a passo
          </summary>

          <div className="cagp-instalar-papel">
            <div data-instalar-so="ios" hidden>
              <Passos>
                <li>
                  <strong>Use o Safari.</strong> Veio pelo WhatsApp ou pelo Instagram? Toque antes em{' '}
                  <strong>Abrir no navegador</strong> (no WhatsApp, é a bússola).
                </li>
                <li>
                  Toque em <strong>Compartilhar</strong> <Glifo nome="compartilhar" />. Em iPhone mais novo, ele fica dentro dos{' '}
                  <strong>três pontinhos</strong>.
                </li>
                <li>
                  Toque em <strong>Adicionar à Tela de Início</strong> <Glifo nome="adicionar" /> e confirme em <strong>Adicionar</strong>.
                </li>
              </Passos>
              <p className="cagp-instalar-nota">
                No iPhone isso também evita que o Safari apague suas horas e notas depois de uma semana sem abrir o site. O
                aplicativo começa vazio: se você já preencheu alguma coisa, leve com{' '}
                <button type="button" data-cagp-dispatch="cagp:open-passport">Levar pro outro celular</button>, em Seu perfil.
              </p>
            </div>

            <div data-instalar-so="android" hidden>
              <Passos>
                <li>
                  Toque nos <strong>três pontinhos</strong> <Glifo nome="pontinhos" /> do navegador, no canto de cima.
                </li>
                <li>
                  Toque em <strong>Adicionar à tela inicial</strong>. Em alguns celulares aparece <strong>Instalar aplicativo</strong>.
                </li>
                <li>
                  Confirme em <strong>Instalar</strong> ou <strong>Adicionar</strong>.
                </li>
              </Passos>
              <p className="cagp-instalar-nota">
                Veio pelo WhatsApp ou pelo Instagram e a opção não aparece? Toque nos três pontinhos, escolha{' '}
                <strong>Abrir no Chrome</strong> e repita.
              </p>
            </div>

            <div data-instalar-so="embutido" hidden>
              <p className="cagp-instalar-aviso">
                Você abriu o site por dentro de outro aplicativo, e daqui não dá pra pôr na tela inicial. Primeiro:
              </p>
              <Passos>
                <li>
                  Toque nos <strong>três pontinhos</strong> <Glifo nome="pontinhos" />, no canto de cima.
                </li>
                <li>
                  Toque em <strong>Abrir no navegador</strong> (Chrome ou Safari).
                </li>
                <li>Lá, volte a este bloco: ele mostra o caminho do seu celular.</li>
              </Passos>
              <button type="button" className="sk-btn cagp-instalar-copiar" data-instalar-copiar>
                <i className="bi bi-link-45deg" aria-hidden="true" />
                Copiar o link do site
              </button>
            </div>

            <div data-instalar-so="geral">
              <p>
                <strong>No Android:</strong> abra o site no Chrome, toque nos três pontinhos <Glifo nome="pontinhos" /> e em{' '}
                <strong>Adicionar à tela inicial</strong>.
              </p>
              <p>
                <strong>No iPhone:</strong> abra o site no Safari, toque em <strong>Compartilhar</strong> <Glifo nome="compartilhar" /> e
                depois em <strong>Adicionar à Tela de Início</strong> <Glifo nome="adicionar" />.
              </p>
            </div>

            <p className="cagp-instalar-nota">Só os documentos em PDF e Word continuam precisando de internet.</p>
          </div>
        </details>

      </div>

      {naHome && (
        <button type="button" className="cagp-instalar-depois" data-instalar-dispensar aria-label="Agora não: esconder esta recomendação">
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
      )}
    </section>
  );
};
