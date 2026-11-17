// src/components/features/semente/DesenhosDaChapa.tsx — Os desenhos feitos à mão do tour das propostas.
//
// De onde vem cada coisa (12/11/2026, depois de três rodadas com o Gabriel: sem rostos, traço fiel,
// desenho com sentido para o assunto e com cara de feito à mão):
//   • Mãos, estrela-explosão, letras "Chapa" e tracinhos de ênfase são os DESENHOS ORIGINAIS de
//     _referencias/desenhos, vetorizados dos próprios pixels por scripts/desenhos/extrair-referencia.py
//     (src/data/desenhosReferencia.json). Nada disso é redesenhado; só o tom de pele muda.
//   • O vídeo de referência tem três desenhos diferentes do mesmo adesivo (quem desenhou refez a
//     estrela, as letras e a mão a cada quadro). Os três estão guardados, e alternar entre eles é a
//     animação original: `useQuadro` troca de desenho a cada ~0,3 s, e os tracinhos só aparecem no
//     terceiro, como no vídeo.
//   • Os objetos (nota fiscal, certificado, celular, exclamação) são gerados por
//     scripts/desenhos/gerar-objetos.mjs com traço de caneta (perfect-freehand): a linha treme, engrossa
//     e afina, e passa do ponto ao fechar. Estão na escala e na espessura das mãos.
//   • Para uma mão SEGURAR algo: a mão do V inteira, o objeto por cima e, por cima dele, só o polegar
//     (`maoV.polegar`). A borda esquerda do objeto passa pela ponta do traço de baixo do polegar.
//   • As entradas são em quadros (pose, passa do ponto, assenta), não deslizes suaves.
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import REF_JSON from '@/data/desenhosReferencia.json';
import OBJ_JSON from '@/data/desenhosObjetos.json';
import { ARTISTA_DOS_DESENHOS } from '@/lib/creditos';

interface Peca {
  fill: string;
  ink: string;
}
interface Mao {
  w: number;
  h: number;
  x?: number;
  y?: number;
  caixa: number[];
  quadros: Peca[];
  polegar?: Peca;
}
const REF = REF_JSON as unknown as {
  adesivo: { w: number; h: number; caixa: number[]; quadros: { fill: string; letras: string }[] };
  maoV: Mao;
  maoRock: Mao;
  tracos: { w: number; h: number; x: number; y: number; ink: string }[];
};
/** Os 14 desenhos das propostas têm o nome do campo `art` de src/lib/propostasTour.ts. */
export type DesenhoDeProposta =
  | 'contas' | 'reunioes' | 'site' | 'cnpj' | 'seguranca' | 'patrimonio' | 'calouros'
  | 'entidades' | 'eventos' | 'cursos' | 'empresa' | 'comunicacao' | 'produtos' | 'escuta';
type NomeObjeto = 'nota' | 'certificado' | 'celular' | 'exclamacao' | DesenhoDeProposta;
const OBJ = OBJ_JSON as unknown as Record<NomeObjeto, { w: number; h: number; partes: { d: string; cor: string }[]; caneta?: string }> & { traco: number };

const INK = '#151515';
const LARANJA = '#FE8812';
/** Tons de pele: o pêssego do desenho original e mais três. */
export const PELE = ['#8D5A3B', '#C68A5E', '#FDD9B5', '#6E452F'] as const;
/** Na mão do V, a ponta do traço de baixo do polegar: por ali passa a borda do que a mão segura. */
const PONTA_DO_POLEGAR = { x: 127, y: 303 };
const N_QUADROS = REF.adesivo.quadros.length;

/** O desenho da vez (0, 1, 2…): troca a cada ~0,3 s, no ritmo do vídeo de referência. */
export function useQuadro(ms = 320): number {
  const [q, setQ] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setQ((v) => v + 1), ms);
    return () => window.clearInterval(t);
  }, [ms]);
  return q;
}

/** Caminho vindo do potrace (y para cima): vira para o sistema do SVG. */
const Pot: React.FC<{ d: string; h: number; fill: string } & React.SVGProps<SVGPathElement>> = ({ d, h, fill, ...resto }) => (
  <g transform={`translate(0 ${h}) scale(1 -1)`}>
    <path d={d} fill={fill} {...resto} />
  </g>
);

const PecaMao: React.FC<{ peca: Peca; h: number; pele: string }> = ({ peca, h, pele }) => (
  <>
    <Pot d={peca.fill} h={h} fill={pele} />
    <Pot d={peca.ink} h={h} fill={INK} />
  </>
);

/** Entrada em quadros: escondido, pose que passa do ponto, pose final. Sem interpolar. */
const degrau = (t: number) => (t >= 1 ? 1 : 0);
const Surge: React.FC<{ children: React.ReactNode; delay?: number; dx?: number; dy?: number }> = ({ children, delay = 0, dx = 0, dy = 0 }) => (
  <motion.g
    initial={{ opacity: 0, x: dx, y: dy }}
    animate={{ opacity: [0, 1, 1], x: [dx, -dx * 0.12, 0], y: [dy, -dy * 0.12, 0] }}
    transition={{ duration: 0.34, delay, times: [0, 0.5, 1], ease: degrau }}
  >
    {children}
  </motion.g>
);
const Estala: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.g
    style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: [0, 1, 1], scale: [0.6, 1.1, 1] }}
    transition={{ duration: 0.34, delay, times: [0, 0.5, 1], ease: degrau }}
  >
    {children}
  </motion.g>
);

/** A estrela-explosão do adesivo original, centrada em (cx, cy), com `larg` de largura. */
export const EstrelaDaChapa: React.FC<{ quadro: number; cx: number; cy: number; larg: number; letras?: boolean; traco?: number }> = ({
  quadro,
  cx,
  cy,
  larg,
  letras,
  traco = 3,
}) => {
  const [x0, y0, x1, y1] = REF.adesivo.caixa;
  const k = larg / (x1 - x0);
  const q = REF.adesivo.quadros[quadro % N_QUADROS];
  return (
    <g transform={`translate(${cx} ${cy}) scale(${k}) translate(${-(x0 + x1) / 2} ${-(y0 + y1) / 2})`}>
      {/* `traco` é a espessura na unidade de quem usa: a mesma das mãos e dos objetos ao lado. */}
      <Pot d={q.fill} h={REF.adesivo.h} fill={LARANJA} stroke={INK} strokeWidth={traco / k} strokeLinejoin="round" />
      {letras && <Pot d={q.letras} h={REF.adesivo.h} fill={INK} />}
    </g>
  );
};

/** Os tracinhos de ênfase do desenho original (grupo 0: à direita; grupo 1: à esquerda). */
const Tracinhos: React.FC<{ grupo: 0 | 1; x: number; y: number; k: number; visivel: boolean }> = ({ grupo, x, y, k, visivel }) => {
  const t = REF.tracos[grupo];
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} opacity={visivel ? 1 : 0}>
      <Pot d={t.ink} h={t.h} fill={INK} />
    </g>
  );
};

/** Um objeto desenhado a caneta, nas unidades do desenho de referência. */
const Objeto: React.FC<{ nome: NomeObjeto }> = ({ nome }) => (
  <>
    {OBJ[nome].partes.map((p, i) => (
      <path key={i} d={p.d} fill={p.cor} />
    ))}
  </>
);

/** Posiciona uma mão pelo meio do pulso (x, y), em escala k. */
function encaixe(m: Mao, x: number, y: number, k: number, rot = 0, espelho = false): string {
  const [bx0, , bx1, by1] = m.caixa;
  return `translate(${x} ${y}) rotate(${rot}) scale(${espelho ? -k : k} ${k}) translate(${-(bx0 + bx1) / 2} ${-by1})`;
}

/** Uma mão solta (o V, que alterna entre os três desenhos, ou a do rock). */
const MaoSolta: React.FC<{ tipo: 'v' | 'rock'; quadro?: number; x: number; y: number; k: number; pele: string; rot?: number; espelho?: boolean }> = ({
  tipo,
  quadro = 0,
  x,
  y,
  k,
  pele,
  rot,
  espelho,
}) => {
  const m = tipo === 'v' ? REF.maoV : REF.maoRock;
  return (
    <g transform={encaixe(m, x, y, k, rot, espelho)}>
      <PecaMao peca={m.quadros[quadro % m.quadros.length]} h={m.h} pele={pele} />
    </g>
  );
};

/**
 * O que a mão segura, nas coordenadas da mão do V: a borda esquerda do objeto (ponto `px, py` do
 * objeto) passa pela ponta do polegar, inclinada em `giro` graus para cobrir os dedos de trás.
 */
const Preso: React.FC<{ px: number; py: number; giro: number; children: React.ReactNode }> = ({ px, py, giro, children }) => (
  <g transform={`translate(${PONTA_DO_POLEGAR.x - px} ${PONTA_DO_POLEGAR.y - py}) rotate(${giro} ${px} ${py})`}>{children}</g>
);

/** A mão do V segurando algo: mão, objeto, e o polegar por cima. */
const MaoSegurando: React.FC<{ x: number; y: number; k: number; pele: string; rot?: number; children: React.ReactNode }> = ({ x, y, k, pele, rot, children }) => {
  const m = REF.maoV;
  return (
    <g transform={encaixe(m, x, y, k, rot)}>
      <PecaMao peca={m.quadros[0]} h={m.h} pele={pele} />
      {children}
      {m.polegar && <PecaMao peca={m.polegar} h={m.h} pele={pele} />}
    </g>
  );
};

/** A cena de cada eixo da carta (viewBox 0 0 320 180). */
export const CenaDoEixo: React.FC<{ eixo: number }> = ({ eixo }) => {
  const q = useQuadro();
  const piscada = q % N_QUADROS === N_QUADROS - 1;
  switch (eixo) {
    // Raiz · transparência e gestão: a nota fiscal na sua mão, com o total circulado.
    case 1:
      return (
        <>
          <Estala delay={0.05}><EstrelaDaChapa quadro={q} cx={178} cy={86} larg={268} /></Estala>
          <Surge dy={70} delay={0.2}>
            <MaoSegurando x={112} y={184} k={0.37} rot={6} pele={PELE[3]}>
              <Preso px={9} py={300} giro={-11.5}>
                <Objeto nome="nota" />
                <motion.path
                  d={OBJ.nota.caneta}
                  fill="none"
                  stroke={LARANJA}
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ pathLength: { duration: 0.7, delay: 0.9, ease: [0.3, 0, 0.3, 1] }, opacity: { duration: 0.01, delay: 0.9 } }}
                />
              </Preso>
            </MaoSegurando>
          </Surge>
          <Tracinhos grupo={0} x={238} y={12} k={0.2} visivel={piscada} />
        </>
      );
    // Broto · cultura e bem viver: a turma de mão pra cima recebendo quem chega.
    case 2:
      return (
        <>
          <Estala delay={0.05}><EstrelaDaChapa quadro={q} cx={160} cy={96} larg={286} /></Estala>
          <Surge dy={80} delay={0.15}><MaoSolta tipo="rock" x={66} y={186} k={0.32} pele={PELE[1]} rot={-6} espelho /></Surge>
          <Surge dy={80} delay={0.35}><MaoSolta tipo="rock" x={258} y={186} k={0.32} pele={PELE[2]} rot={8} /></Surge>
          <Surge dy={90} delay={0.25}><MaoSolta tipo="v" quadro={q + 1} x={162} y={190} k={0.39} pele={PELE[3]} /></Surge>
          <Tracinhos grupo={0} x={226} y={4} k={0.17} visivel={piscada} />
          <Tracinhos grupo={1} x={64} y={8} k={0.17} visivel={piscada} />
        </>
      );
    // Planta · acadêmico e carreira: o certificado do evento ou do curso, passando de uma mão para outra.
    case 3: {
      const k = 0.3;
      const mao = (x: number, espelho: boolean, pele: string, parte: 'mao' | 'polegar') => (
        <g transform={encaixe(REF.maoV, x, 178, k, espelho ? -11.5 : 11.5, espelho)}>
          <PecaMao peca={parte === 'polegar' && REF.maoV.polegar ? REF.maoV.polegar : REF.maoV.quadros[0]} h={REF.maoV.h} pele={pele} />
        </g>
      );
      return (
        <>
          <Estala delay={0.05}><EstrelaDaChapa quadro={q} cx={160} cy={72} larg={290} /></Estala>
          <Surge dy={70} delay={0.2}>
            {mao(76, false, PELE[0], 'mao')}
            {mao(244, true, PELE[2], 'mao')}
            <g transform={`translate(66.8 46.3) scale(${k})`}><Objeto nome="certificado" /></g>
            {mao(76, false, PELE[0], 'polegar')}
            {mao(244, true, PELE[2], 'polegar')}
          </Surge>
          <Tracinhos grupo={0} x={264} y={0} k={0.15} visivel={piscada} />
        </>
      );
    }
    // Fruto · comunicação: o aviso do curso chega no seu celular.
    default:
      return (
        <>
          <Estala delay={0.5}>
            <EstrelaDaChapa quadro={q} cx={226} cy={60} larg={168} />
            <g transform="translate(218 30) scale(0.3)"><Objeto nome="exclamacao" /></g>
          </Estala>
          <Surge dy={70} delay={0.15}>
            <MaoSegurando x={108} y={186} k={0.37} rot={5} pele={PELE[1]}>
              <Preso px={12} py={322} giro={-11.5}><Objeto nome="celular" /></Preso>
            </MaoSegurando>
          </Surge>
          <Tracinhos grupo={0} x={280} y={0} k={0.16} visivel={piscada} />
        </>
      );
  }
};

/**
 * O adesivo "Chapa ✌" inteiro, como foi desenhado: a estrela, as letras e a mão nas posições
 * originais, alternando entre os três desenhos; os tracinhos aparecem no terceiro, como no vídeo.
 * (O rosto do desenho original não entra: é o retrato de uma pessoa.)
 */
export const AdesivoChapa: React.FC<{ className?: string }> = ({ className = '' }) => {
  const q = useQuadro();
  const a = REF.adesivo;
  const [x0, y0, x1, y1] = a.caixa;
  const quadro = a.quadros[q % N_QUADROS];
  const mao = REF.maoV;
  const piscada = q % N_QUADROS === N_QUADROS - 1;
  const margem = 40;
  return (
    <svg
      viewBox={`${x0 - margem} ${y0 - margem} ${x1 - x0 + margem * 2} ${y1 - y0 + margem * 2}`}
      className={className}
      role="img"
      aria-label={`Chapa 2, desenhado à mão por ${ARTISTA_DOS_DESENHOS.nome}: a palavra Chapa e uma mão fazendo o dois com os dedos`}
    >
      <Pot d={quadro.fill} h={a.h} fill={LARANJA} stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <Pot d={quadro.letras} h={a.h} fill={INK} />
      <g transform={`translate(${mao.x ?? 0} ${mao.y ?? 0})`}>
        <PecaMao peca={mao.quadros[q % mao.quadros.length]} h={mao.h} pele={PELE[2]} />
      </g>
      {/* Só os tracinhos da esquerda: os da direita ficavam ao lado do rosto, que não entra. */}
      <g transform={`translate(${REF.tracos[1].x} ${REF.tracos[1].y})`} opacity={piscada ? 1 : 0}>
        <Pot d={REF.tracos[1].ink} h={REF.tracos[1].h} fill={INK} />
      </g>
    </svg>
  );
};

/**
 * O adesivo de uma proposta: o desenho dela (caneta) dentro da estrela original, que alterna entre os
 * três desenhos; os tracinhos aparecem no terceiro. Entra em três poses, sem deslizar.
 */
export const AdesivoDaProposta: React.FC<{ art: DesenhoDeProposta; className?: string; delay?: number }> = ({ art, className = '', delay = 0.45 }) => {
  const q = useQuadro();
  const piscada = q % N_QUADROS === N_QUADROS - 1;
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 230 150"
      className={className}
      style={{ overflow: 'visible' }}
      initial={{ opacity: 0, scale: 1.5, rotate: 12 }}
      animate={{ opacity: [0, 1, 1], scale: [1.5, 0.94, 1], rotate: [12, 2, 4] }}
      transition={{ duration: 0.34, delay, times: [0, 0.5, 1], ease: degrau }}
    >
      <EstrelaDaChapa quadro={q} cx={115} cy={78} larg={222} />
      <g transform="translate(67 30) scale(0.32)">
        <Objeto nome={art} />
      </g>
      <Tracinhos grupo={1} x={-6} y={6} k={0.16} visivel={piscada} />
    </motion.svg>
  );
};
