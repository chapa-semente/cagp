// MolduraNoPerfil.tsx — A moldura de apoio dentro de Seu perfil (13/11/2026).
//
// A ferramenta mora em /chapa-semente/moldura e ficava escondida na aba Chapa 2. Aqui ela aparece onde
// a foto da pessoa já está: um cartão Cartaz no alto da carteirinha, com a própria foto dentro do
// medalhão (o mesmo desenho do canvas da ferramenta, src/scripts/molduraDeApoio.ts). É um atalho: a
// dona da função continua sendo a página. O script só é baixado quando Seu perfil abre.
// Some sozinho depois da votação, como a faixa de voto.
import React, { useEffect, useRef, useState } from 'react';
import { MarkerWord } from '@/components/ui/marker-word';
import { amostraDoAnel, anelDoId } from '@/lib/molduras';
import { route } from '@/lib/paths';

/** Fim da votação (horário de Brasília), o mesmo da faixa de voto e de src/lib/compartilhar.ts. */
const FIM_DA_VOTACAO = Date.parse('2026-11-26T22:30:00-03:00');

/** A frase e o anel da amostra: "Sou GP" é o que a carteirinha já diz, e não tem gênero. */
const FRASE_DA_AMOSTRA = 'sou-gp';
const ANEL_DA_AMOSTRA = 'fruto';

const DESTINO = route('/chapa-semente/moldura');

/** A moldura só é oferecida durante a campanha e fora da própria página da moldura. */
export function molduraEmCampanha(): boolean {
  if (typeof window === 'undefined') return false;
  if (Date.now() > FIM_DA_VOTACAO) return false;
  return !window.location.pathname.replace(/\/$/, '').endsWith('/chapa-semente/moldura');
}

/** Leva a frase e o anel da amostra para a ferramenta (se o script já chegou) antes de trocar de página. */
export function levarAmostraPraMoldura() {
  import('@/scripts/molduraDeApoio').then((m) => m.comecarCom(FRASE_DA_AMOSTRA, ANEL_DA_AMOSTRA)).catch(() => {});
}

interface MolduraNoPerfilProps {
  /** A foto de Seu perfil (data URL), quando há. */
  foto?: string;
  /** Fecha Seu perfil ao sair para a página da moldura. */
  onIr: () => void;
}

export const MolduraNoPerfil: React.FC<MolduraNoPerfilProps> = ({ foto, onIr }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pronta, setPronta] = useState(false);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => setVisivel(molduraEmCampanha()), []);

  useEffect(() => {
    if (!visivel) return;
    let vivo = true;
    setPronta(false);
    import('@/scripts/molduraDeApoio')
      .then(async (m) => {
        if (!canvasRef.current) return;
        await m.desenharAmostra(canvasRef.current, foto ?? null, FRASE_DA_AMOSTRA, ANEL_DA_AMOSTRA);
        if (vivo) setPronta(true);
      })
      .catch(() => {
        /* sem o script fica a amostra do anel, e o link continua levando à ferramenta */
      });
    return () => {
      vivo = false;
    };
  }, [foto, visivel]);

  if (!visivel) return null;

  return (
    <a
      href={DESTINO}
      className="cagp-perfil-moldura"
      data-so-campanha
      data-tem-foto={foto ? '' : undefined}
      onClick={() => {
        levarAmostraPraMoldura();
        onIr();
      }}
    >
      <span className="cagp-perfil-moldura__fundo" aria-hidden="true">
        <svg viewBox="-40 -104 60 108" focusable="false">
          <use href="#sg-folha" />
        </svg>
      </span>

      <span className="cagp-perfil-moldura__medalhao" data-pronta={pronta ? '' : undefined} aria-hidden="true">
        <svg viewBox="0 0 48 48" focusable="false" dangerouslySetInnerHTML={{ __html: amostraDoAnel(anelDoId(ANEL_DA_AMOSTRA)) }} />
        <canvas ref={canvasRef} width={1080} height={1080} />
        {!foto && <i className="bi bi-camera" />}
      </span>

      <span className="cagp-perfil-moldura__texto">
        <strong className="cagp-perfil-moldura__titulo">
          {foto ? (
            <>
              Sua foto já tá na <MarkerWord onColor>moldura</MarkerWord>
            </>
          ) : (
            <>
              Põe a sua <MarkerWord onColor>cara</MarkerWord> na campanha
            </>
          )}
        </strong>
        <span className="cagp-perfil-moldura__sub">
          {foto ? 'Escolhe a frase e a cor, e posta.' : 'Uma foto, uma frase e tá pronta.'}
          <span className="cagp-perfil-moldura__mais"> Vale pro perfil, pro feed e pro story. A foto não sai do seu aparelho.</span>
        </span>
      </span>

      <span className="cagp-perfil-moldura__botao">
        Fazer minha moldura
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </span>
    </a>
  );
};
