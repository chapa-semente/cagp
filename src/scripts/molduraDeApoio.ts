// src/scripts/molduraDeApoio.ts — A moldura de apoio (decisão do Gabriel em 11/11/2026).
//
// A pessoa escolhe uma foto dela, uma frase ("Gostosas com Chapa 2", "Faz o S!", "Sou fumpista"…), a
// cor do anel (as cores da chapa, uma bandeira do orgulho ou as cores da neurodiversidade) e um formato
// (perfil, feed ou story), e baixa ou posta. Tudo é desenhado num <canvas> aqui no navegador: a foto
// não sai do aparelho, nada vai para servidor nenhum e a frase e o anel escolhidos não ficam guardados.
// Frases e anéis em src/data/molduras.json (lidos por src/lib/molduras.ts); marcação em
// src/pages/chapa-semente/moldura.astro e na última tela do tour (SementeTour.tsx).
import {
  ANEIS,
  FRASES,
  TINTA,
  anelDoId,
  anelEstampado,
  corDoAnelEm,
  degrauDaCunha,
  faixasDoAnel,
  fraseDoId,
  temGenero,
  textoDaFrase,
  tintaSobre,
  type Anel,
  type Flexao,
} from '@/lib/molduras';
import { corpoDoVoto, montarMensagem, urlAbsoluta } from '@/lib/compartilhar';
import { asset, route } from '@/lib/paths';
import { FOLHA_PATH } from '@/lib/sementeGeometry';
import { guardarFotoNoPerfil, lerFotoDoPerfil } from '@/lib/fotoDoPerfil';

type Formato = 'perfil' | 'feed' | 'story';

const LARANJA = '#FE8812';
const ROXO = '#5B2A85';
const FORMATOS: Record<Formato, [number, number]> = { perfil: [1080, 1080], feed: [1080, 1350], story: [1080, 1920] };

const estado = {
  foto: null as HTMLImageElement | null,
  zoom: 1,
  dx: 0,
  dy: 0,
  frase: FRASES[0].id,
  anel: FRASES[0].anel ?? ANEIS[0].id,
  /** A pessoa tocou numa frase: a amostra de Seu perfil passa a mostrar a escolha dela. */
  fraseNaMao: false,
  /** A pessoa tocou num anel: daí em diante nenhuma frase troca a cor sozinha. */
  anelNaMao: false,
  flexao: 'o' as Flexao,
  formato: 'perfil' as Formato,
};
const logos: { claro?: HTMLImageElement; escuro?: HTMLImageElement } = {};
/** Na amostra de Seu perfil o círculo sem foto fica vazio: lá o convite é do HTML, não do desenho. */
let semConvite = false;

function carregar(src: string): Promise<HTMLImageElement> {
  return new Promise((ok, erro) => {
    const im = new Image();
    im.onload = () => ok(im);
    im.onerror = erro;
    im.src = src;
  });
}

function adesivoDoNumero(c: CanvasRenderingContext2D, x: number, y: number, k: number) {
  const w = 112 * k;
  const h = 122 * k;
  const folha = (ox: number, oy: number, cor: string, traco: number) => {
    c.beginPath();
    c.roundRect(ox, oy, w, h, [34 * k, 10 * k, 34 * k, 10 * k]);
    c.fillStyle = cor;
    c.fill();
    if (traco) {
      c.lineWidth = traco;
      c.strokeStyle = TINTA;
      c.stroke();
    }
  };
  c.save();
  c.translate(x + w / 2, y + h / 2);
  c.rotate((-4 * Math.PI) / 180);
  c.translate(-w / 2, -h / 2);
  folha(10 * k, 10 * k, TINTA, 0);
  folha(5 * k, 5 * k, LARANJA, 3 * k);
  folha(0, 0, '#FFFFFF', 4 * k);
  c.textAlign = 'center';
  c.fillStyle = TINTA;
  c.font = `700 ${17 * k}px Poppins, sans-serif`;
  c.fillText('CHAPA', w / 2, 31 * k);
  c.fillStyle = ROXO;
  c.font = `700 ${84 * k}px Poppins, sans-serif`;
  c.fillText('2', w / 2, 104 * k);
  c.restore();
}

/** Texto na caneta, reto (a linha de baixo dos formatos em pé): laranja com contorno de tinta. */
function escrever(c: CanvasRenderingContext2D, linha: string, x: number, y: number, corpo: number, cor = LARANJA) {
  c.save();
  c.translate(x, y);
  c.rotate((-2 * Math.PI) / 180);
  c.font = `400 ${corpo}px 'Permanent Marker', cursive`;
  c.textAlign = 'center';
  c.lineJoin = 'round';
  c.lineWidth = corpo * 0.17;
  c.strokeStyle = TINTA;
  c.strokeText(linha, 0, 0);
  c.fillStyle = cor;
  c.fillText(linha, 0, 0);
  c.restore();
}

/**
 * O fundo da tela inteira na cor do anel. O medalhão não pinta o próprio anel: ele é este fundo visto
 * entre os dois contornos, e por isso a bandeira passa inteira por trás da foto, no perfil e no cartaz.
 * Tudo chapado: faixas, a cunha do Progresso apontando para a foto, ou a roda de cores em volta dela.
 */
function pintarFundo(c: CanvasRenderingContext2D, W: number, H: number, cx: number, cy: number, R: number, a: Anel) {
  c.fillStyle = a.cor ?? '#FFFFFF';
  c.fillRect(0, 0, W, H);
  for (const f of faixasDoAnel(a)) {
    c.fillStyle = f.cor;
    c.fillRect(0, Math.floor(f.de * H), W, Math.ceil((f.ate - f.de) * H) + 1);
  }
  a.cunha?.forEach((cor, i) => {
    const m = R * degrauDaCunha(i);
    const x0 = cx - R;
    c.beginPath();
    c.moveTo(0, cy - m - x0);
    c.lineTo(x0 + m, cy);
    c.lineTo(0, cy + m + x0);
    c.closePath();
    c.fillStyle = cor;
    c.fill();
  });
  if (a.roda) {
    const passo = (Math.PI * 2) / a.roda.length;
    const longe = Math.hypot(W, H);
    a.roda.forEach((cor, i) => {
      const de = -Math.PI / 2 - passo / 2 + i * passo;
      c.beginPath();
      c.moveTo(cx, cy);
      c.arc(cx, cy, longe, de, de + passo + 0.004);
      c.closePath();
      c.fillStyle = cor;
      c.fill();
    });
  }
}

/** O infinito da neurodiversidade num adesivo do kit (branco, contorno de tinta, sombra dura). */
function adesivoDoInfinito(c: CanvasRenderingContext2D, x: number, y: number, k: number, cores: string[]) {
  const w = 132 * k;
  const h = 78 * k;
  const pilula = (ox: number, oy: number, cor: string, traco: number) => {
    c.beginPath();
    c.roundRect(ox - w / 2, oy - h / 2, w, h, [28 * k, 9 * k, 28 * k, 9 * k]);
    c.fillStyle = cor;
    c.fill();
    if (traco) {
      c.lineWidth = traco;
      c.strokeStyle = TINTA;
      c.stroke();
    }
  };
  c.save();
  c.translate(x, y);
  c.rotate((-7 * Math.PI) / 180);
  pilula(7 * k, 7 * k, TINTA, 0);
  pilula(0, 0, '#FFFFFF', 4 * k);
  // lemniscata de Bernoulli; cada cor pinta um trecho do laço
  const a = 43 * k;
  const ponto = (t: number) => {
    const d = 1 + Math.sin(t) ** 2;
    return [(a * Math.cos(t)) / d, (a * 1.25 * Math.sin(t) * Math.cos(t)) / d] as const;
  };
  const trecho = (de: number, ate: number, cor: string, largura: number) => {
    c.beginPath();
    for (let i = 0; i <= 40; i++) {
      const [px, py] = ponto(de + ((ate - de) * i) / 40);
      if (i) c.lineTo(px, py);
      else c.moveTo(px, py);
    }
    c.lineWidth = largura;
    c.strokeStyle = cor;
    c.stroke();
  };
  c.lineCap = 'round';
  c.lineJoin = 'round';
  trecho(0, Math.PI * 2, TINTA, 19 * k);
  c.lineCap = cores.length > 1 ? 'butt' : 'round';
  const passo = (Math.PI * 2) / cores.length;
  cores.forEach((cor, i) => trecho(i * passo - 0.02, (i + 1) * passo + 0.02, cor, 10 * k));
  c.restore();
}

/**
 * Escreve acompanhando o anel. `embaixo` lê da esquerda pra direita pela base do círculo (como um
 * sorriso); em cima, pelo topo. Primeiro todos os contornos, depois todos os preenchimentos, para o
 * contorno de uma letra não cobrir a vizinha.
 */
function textoNoArco(
  c: CanvasRenderingContext2D,
  texto: string,
  cx: number,
  cy: number,
  raio: number,
  embaixo: boolean,
  o: { fonte: string; corpo: number; cor: string; contorno?: string; circularS?: string },
) {
  c.save();
  c.font = o.fonte;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.lineJoin = 'round';
  const letras = [...texto];
  const larguras = letras.map((ch) => c.measureText(ch).width);
  const vao = o.corpo * 0.03;
  const total = larguras.reduce((a, b) => a + b, 0) + vao * (letras.length - 1);
  let pos = -total / 2;
  const itens = letras.map((ch, i) => {
    const meio = pos + larguras[i] / 2;
    pos += larguras[i] + vao;
    const a = embaixo ? Math.PI / 2 - meio / raio : -Math.PI / 2 + meio / raio;
    return { ch, a, w: larguras[i] };
  });
  const cada = (fn: (it: (typeof itens)[number]) => void) =>
    itens.forEach((it) => {
      c.save();
      c.translate(cx + raio * Math.cos(it.a), cy + raio * Math.sin(it.a));
      c.rotate(embaixo ? it.a - Math.PI / 2 : it.a + Math.PI / 2);
      fn(it);
      c.restore();
    });
  if (o.contorno) {
    c.lineWidth = o.corpo * 0.18;
    c.strokeStyle = o.contorno;
    cada((it) => c.strokeText(it.ch, 0, 0));
  }
  c.fillStyle = o.cor;
  cada((it) => c.fillText(it.ch, 0, 0));
  if (o.circularS) {
    // o círculo da caneta em volta do S de "Faz o S!"
    const alvo = itens[texto.lastIndexOf('S')];
    if (alvo) {
      c.lineWidth = o.corpo * 0.08;
      c.strokeStyle = o.circularS;
      c.save();
      c.translate(cx + raio * Math.cos(alvo.a), cy + raio * Math.sin(alvo.a));
      c.rotate(embaixo ? alvo.a - Math.PI / 2 : alvo.a + Math.PI / 2);
      c.beginPath();
      c.ellipse(0, -o.corpo * 0.02, alvo.w * 0.86, o.corpo * 0.6, -0.1, 0, Math.PI * 2);
      c.stroke();
      c.restore();
    }
  }
  c.restore();
}

/**
 * O medalhão: a foto num círculo e, em volta, o anel da campanha com o texto no arco, a data no alto,
 * o adesivo do 2 e a folha que brota. É redondo porque foto de perfil é redonda em todo aplicativo.
 */
function medalhao(c: CanvasRenderingContext2D, cx: number, cy: number, R: number, H: number) {
  const m = fraseDoId(estado.frase);
  const a = anelDoId(estado.anel);
  const anel = R * 0.23;
  const rFoto = R - anel;
  const u = R / 540;

  // O anel é o fundo da tela (pintarFundo) visto entre os dois contornos. Só a bandeira intersexo
  // pinta algo aqui: o círculo roxo dela, colado na foto.
  if (a.aro) {
    c.beginPath();
    c.arc(cx, cy, rFoto + anel * 0.26, 0, Math.PI * 2);
    c.fillStyle = a.aro;
    c.fill();
    c.lineWidth = 5 * u;
    c.strokeStyle = TINTA;
    c.stroke();
  }

  // a foto, cobrindo o círculo de dentro (ou o convite para escolher uma)
  c.save();
  c.beginPath();
  c.arc(cx, cy, rFoto, 0, Math.PI * 2);
  c.clip();
  c.fillStyle = '#EFE7F6';
  c.fillRect(cx - rFoto, cy - rFoto, rFoto * 2, rFoto * 2);
  if (estado.foto) {
    const f = estado.foto;
    const lado = rFoto * 2;
    const s = Math.max(lado / f.naturalWidth, lado / f.naturalHeight) * estado.zoom;
    const w = f.naturalWidth * s;
    const h = f.naturalHeight * s;
    // dx e dy ficam em frações do lado, para valerem igual em qualquer formato
    const folgaX = (w - lado) / 2 / lado;
    const folgaY = (h - lado) / 2 / lado;
    estado.dx = Math.max(-folgaX, Math.min(folgaX, estado.dx));
    estado.dy = Math.max(-folgaY, Math.min(folgaY, estado.dy));
    c.drawImage(f, cx - w / 2 + estado.dx * lado, cy - h / 2 + estado.dy * lado, w, h);
  } else if (!semConvite) {
    c.fillStyle = ROXO;
    c.textAlign = 'center';
    c.font = `700 ${62 * u}px Poppins, sans-serif`;
    c.fillText('Sua foto aqui', cx, cy - 6 * u);
    c.font = `400 ${30 * u}px Poppins, sans-serif`;
    c.fillText('Toque em “Escolher minha foto”', cx, cy + 44 * u);
  }
  c.restore();

  // contornos de tinta: a borda da foto e a borda de fora
  c.strokeStyle = TINTA;
  c.lineWidth = 8 * u;
  c.beginPath();
  c.arc(cx, cy, rFoto, 0, Math.PI * 2);
  c.stroke();
  c.beginPath();
  c.arc(cx, cy, R - 4 * u, 0, Math.PI * 2);
  c.stroke();

  // a frase na base do anel, na caneta laranja (branca nos anéis em que o laranja some)
  const frase = textoDaFrase(m, estado.flexao);
  const raioTexto = R - anel * 0.5;
  const sobre = (lado: 'alto' | 'baixo') => tintaSobre(corDoAnelEm(a, lado, (cy + (lado === 'alto' ? -raioTexto : raioTexto)) / H));
  let corpo = anel * 0.8;
  c.font = `400 ${corpo}px 'Permanent Marker', cursive`;
  const larguraArco = raioTexto * 2.62; // ~150° de arco: acaba antes do adesivo do 2 e do infinito
  const largura = c.measureText(frase).width * 1.04;
  if (largura > larguraArco) corpo *= larguraArco / largura;
  textoNoArco(c, frase, cx, cy, raioTexto, true, {
    fonte: `400 ${corpo}px 'Permanent Marker', cursive`,
    corpo,
    cor: a.caneta ?? LARANJA,
    contorno: TINTA,
    circularS: m.circularS ? (sobre('baixo') === TINTA ? ROXO : '#FFFFFF') : undefined,
  });

  // a eleição no alto do anel
  const corpoData = anel * 0.3;
  textoNoArco(c, 'ELEIÇÃO DO CAGP · 25 E 26/11', cx, cy, raioTexto, false, {
    fonte: `700 ${corpoData}px Poppins, sans-serif`,
    corpo: corpoData,
    cor: sobre('alto'),
  });

  // a folha laranja que brota do anel, no alto à esquerda (a mesma dos retratos dos banners)
  const aFolha = -2.62;
  c.save();
  c.translate(cx + rFoto * Math.cos(aFolha), cy + rFoto * Math.sin(aFolha));
  c.rotate(-0.95);
  const kf = R * 0.0026;
  c.scale(kf, kf);
  const folha = new Path2D(FOLHA_PATH);
  c.fillStyle = LARANJA;
  c.fill(folha);
  c.lineWidth = (7 * u) / kf;
  c.lineJoin = 'round';
  c.strokeStyle = TINTA;
  c.stroke(folha);
  c.restore();

  // o adesivo do 2, colado no anel à direita
  const k = u * 1.2;
  const aAdesivo = -0.3;
  adesivoDoNumero(c, cx + (R - anel * 0.5) * Math.cos(aAdesivo) - 56 * k, cy + (R - anel * 0.5) * Math.sin(aAdesivo) - 61 * k, k);

  // o infinito (neurodiversidade, autismo), colado no anel à esquerda, logo abaixo da folha
  if (a.selo) {
    const aSelo = Math.PI + 0.1;
    adesivoDoInfinito(c, cx + (R - anel * 0.52) * Math.cos(aSelo), cy + (R - anel * 0.52) * Math.sin(aSelo), u, a.selo);
  }
}

export function desenhar(canvas: HTMLCanvasElement) {
  const m = fraseDoId(estado.frase);
  const a = anelDoId(estado.anel);
  const [W, H] = FORMATOS[estado.formato];
  canvas.width = W;
  canvas.height = H;
  const c = canvas.getContext('2d')!;
  const u = W / 1080;
  const perfil = estado.formato === 'perfil';
  const story = estado.formato === 'story';
  // O aplicativo corta a foto de perfil num círculo inscrito no quadrado: lá o anel encosta na borda.
  // Feed e story levam o mesmo medalhão num cartaz, com o resto do grito e a assinatura embaixo.
  const R = perfil ? W * 0.497 : W * 0.43;
  const cy = perfil ? H / 2 : story ? H * 0.37 : R + 70 * u;

  pintarFundo(c, W, H, W / 2, cy, R, a);
  if (a.fundo && !perfil) {
    // anel de uma cor só: a folha grande num tom mais fundo, como nos banners
    c.save();
    c.translate(W * 0.9, H + W * 0.12);
    c.rotate((22 * Math.PI) / 180);
    c.scale(W * 0.0075, W * 0.0075);
    c.fillStyle = a.fundo;
    c.fill(new Path2D(FOLHA_PATH));
    c.restore();
  }
  medalhao(c, W / 2, cy, R, H);
  if (perfil) return;

  const frase = textoDaFrase(m, estado.flexao);
  const resto = [frase.includes('Chapa 2') ? '' : 'Vote Chapa 2!', frase.includes('Faz o S') ? '' : 'Faz o S!'].filter(Boolean);
  let y = cy + R + (story ? 168 : 118) * u;
  const medir = (linha: string, corpo: number) => {
    c.font = `400 ${corpo}px 'Permanent Marker', cursive`;
    return c.measureText(linha).width;
  };
  const linhas = story ? resto : [resto.join(' ')];
  for (const linha of linhas) {
    let corpo = (story ? 128 : 112) * u;
    corpo = Math.min(corpo, (corpo * W * 0.84) / medir(linha, corpo));
    escrever(c, linha, W / 2, y, corpo, a.caneta ?? LARANJA);
    y += corpo * 1.18;
  }

  // assinatura: logo oficial e a eleição (no story fica acima do rodapé do aplicativo)
  const base = story ? H - 276 * u : H - 64 * u;
  const alto = 84 * u;
  // Sobre as cores da chapa a assinatura vai direto no fundo. Sobre bandeira ou cor de comunidade ela
  // vai numa ficha branca do kit: o logo oficial só aparece sobre branco ou sobre as cores da marca.
  const ficha = a.grupo !== 'chapa';
  const claro = ficha || tintaSobre(a.cor ?? '#FFFFFF') === TINTA;
  if (ficha) {
    const fx = W * 0.045;
    const fy = base - alto - 26 * u;
    const fw = W * 0.91;
    const fh = alto + 52 * u;
    const raio = [30 * u, 10 * u, 30 * u, 10 * u];
    c.beginPath();
    c.roundRect(fx + 9 * u, fy + 9 * u, fw, fh, raio);
    c.fillStyle = TINTA;
    c.fill();
    c.beginPath();
    c.roundRect(fx, fy, fw, fh, raio);
    c.fillStyle = '#FFFFFF';
    c.fill();
    c.lineWidth = 6 * u;
    c.strokeStyle = TINTA;
    c.stroke();
  }
  const logo = claro ? logos.claro : logos.escuro;
  if (logo) c.drawImage(logo, W * 0.07, base - alto, (logo.naturalWidth / logo.naturalHeight) * alto, alto);
  c.fillStyle = claro ? TINTA : '#FFFFFF';
  c.textAlign = 'right';
  c.font = `700 ${40 * u}px Poppins, sans-serif`;
  c.fillText('25 e 26/11', W * 0.93, base - alto * 0.52);
  c.font = `400 ${28 * u}px Poppins, sans-serif`;
  c.fillText('17h às 22h30 · sala do CAGP', W * 0.93, base - alto * 0.08);
}

function aviso(texto: string, icone = 'bi-check2') {
  (window as any).cagpToast?.(texto, icone, 2800);
}

function arquivo(canvas: HTMLCanvasElement): Promise<File> {
  return new Promise((ok, erro) =>
    canvas.toBlob(
      (blob) => (blob ? ok(new File([blob], `moldura-chapa-2-${estado.formato}.jpg`, { type: 'image/jpeg' })) : erro(new Error('sem imagem'))),
      'image/jpeg',
      0.92,
    ),
  );
}

function baixar(f: File) {
  const url = URL.createObjectURL(f);
  const a = document.createElement('a');
  a.href = url;
  a.download = f.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/**
 * Uma foto só (12/11/2026): a que a pessoa escolhe aqui vira a de Seu perfil, e a de Seu perfil já
 * chega aqui no lugar. `substituir` é falso na página da moldura (não troca a foto que ela já tinha).
 */
export async function usarFoto(origem: File | string, substituirNoPerfil: boolean): Promise<HTMLImageElement> {
  const url = typeof origem === 'string' ? origem : URL.createObjectURL(origem);
  try {
    const im = await carregar(url);
    estado.foto = im;
    estado.zoom = 1;
    estado.dx = 0;
    estado.dy = 0;
    if (typeof origem !== 'string') guardarFotoNoPerfil(im, substituirNoPerfil);
    return im;
  } finally {
    if (typeof origem !== 'string') URL.revokeObjectURL(url);
  }
}

/**
 * A amostra da moldura em Seu perfil (MolduraNoPerfil.tsx): o medalhão de perfil com a foto de lá, na
 * frase e no anel dados. Quem já escolheu frase ou anel na ferramenta vê a própria escolha. Não muda
 * nada do que a ferramenta guarda: desenha e devolve o estado como estava.
 */
export async function desenharAmostra(canvas: HTMLCanvasElement, fotoUrl: string | null, frase: string, anel: string) {
  const [foto] = await Promise.all([
    fotoUrl ? carregar(fotoUrl).catch(() => null) : null,
    document.fonts.load("400 80px 'Permanent Marker'").catch(() => null),
    document.fonts.load('700 40px Poppins').catch(() => null),
  ]);
  const antes = { ...estado };
  const escolheu = estado.fraseNaMao || estado.anelNaMao;
  Object.assign(estado, {
    foto,
    zoom: 1,
    dx: 0,
    dy: 0,
    frase: escolheu ? estado.frase : frase,
    anel: escolheu ? estado.anel : anel,
    formato: 'perfil' as Formato,
  });
  semConvite = true;
  try {
    desenhar(canvas);
  } finally {
    semConvite = false;
    Object.assign(estado, antes);
  }
}

/**
 * Quem sai da amostra de Seu perfil chega à ferramenta com a mesma frase e o mesmo anel que viu lá.
 * Só vale para quem ainda não escolheu nada; a frase seguinte continua puxando o anel dela.
 */
export function comecarCom(frase: string, anel: string) {
  if (estado.fraseNaMao || estado.anelNaMao) return;
  estado.frase = fraseDoId(frase).id;
  estado.anel = anelDoId(anel).id;
}

/** Liga a ferramenta numa marcação `[data-moldura]` (a página da moldura ou a última tela do tour). */
export function ligarMoldura(raiz: HTMLElement) {
  if (raiz.dataset.ligado) return;
  raiz.dataset.ligado = '1';
  // Sem seletor de formato na marcação (tour), a moldura é a de perfil.
  if (!raiz.querySelector('input[name="formato"]')) estado.formato = 'perfil';
  // A marcação segue o que já estava escolhido (quem veio do tour chega à página com a mesma moldura).
  const marcar = (nome: string, valor: string) => {
    const r = raiz.querySelector<HTMLInputElement>(`input[name="${nome}"][value="${valor}"]`);
    if (r) r.checked = true;
    return r;
  };
  marcar('frase', estado.frase);
  marcar('anel', estado.anel);
  marcar('flexao', estado.flexao);
  if (estado.foto) raiz.dataset.temFoto = '1';
  const canvas = raiz.querySelector<HTMLCanvasElement>('canvas')!;
  const entrada = raiz.querySelector<HTMLInputElement>('[data-moldura-foto]')!;
  const zoom = raiz.querySelector<HTMLInputElement>('[data-moldura-zoom]');
  const acoes = raiz.querySelectorAll<HTMLButtonElement>('[data-moldura-baixar], [data-moldura-postar]');
  const redesenhar = () => desenhar(canvas);
  // No celular a prévia fica presa logo abaixo do cabeçalho do site (a página lê --mo-topo).
  const cabecalho = document.querySelector<HTMLElement>('body > header, [data-shell] > header, header');
  if (cabecalho?.offsetHeight) raiz.style.setProperty('--mo-topo', `${cabecalho.offsetHeight}px`);

  redesenhar();
  // As fontes e os logos chegam depois do primeiro desenho; a cada chegada, desenha de novo.
  Promise.all([document.fonts.load("400 80px 'Permanent Marker'"), document.fonts.load('700 40px Poppins'), document.fonts.load('400 40px Poppins')]).then(redesenhar);
  carregar(asset('/logos/semente/semente-horizontal.webp')).then((im) => { logos.claro = im; redesenhar(); }).catch(() => {});
  carregar(asset('/logos/semente/semente-horizontal-branco.webp')).then((im) => { logos.escuro = im; redesenhar(); }).catch(() => {});

  const fotoNoLugar = () => {
    if (zoom) zoom.value = '1';
    raiz.dataset.temFoto = '1';
    raiz.dispatchEvent(new CustomEvent('moldura:foto', { bubbles: true }));
    acoes.forEach((b) => (b.disabled = false));
    redesenhar();
  };

  // Quem já tem foto em Seu perfil (do tour ou da carteirinha) não escolhe de novo.
  const guardada = estado.foto ? null : lerFotoDoPerfil();
  if (guardada) usarFoto(guardada, false).then(fotoNoLugar).catch(() => {});

  entrada.addEventListener('change', async () => {
    const f = entrada.files?.[0];
    if (!f) return;
    try {
      // No tour a foto escolhida é a do perfil; na página da moldura ela só preenche um perfil sem foto.
      await usarFoto(f, raiz.dataset.molduraPerfil === 'substituir');
      fotoNoLugar();
      aviso('Foto no lugar. Arraste pra ajustar.', 'bi-camera');
    } catch {
      aviso('Não deu pra abrir essa foto. Tente outra.', 'bi-camera');
    }
  });

  // As abas de frases: uma por vez na tela. Sem JS todas ficam abertas (o `hidden` nasce aqui).
  const abas = [...raiz.querySelectorAll<HTMLButtonElement>('[data-moldura-aba]')];
  const grupos = [...raiz.querySelectorAll<HTMLElement>('[data-moldura-grupo]')];
  const flexoes = raiz.querySelector<HTMLElement>('[data-moldura-flexoes]');
  const abrirAba = (id: string) => {
    abas.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.molduraAba === id)));
    grupos.forEach((g) => (g.hidden = g.dataset.molduraGrupo !== id));
    // o seletor o / a / e só aparece na aba que tem frase com gênero
    if (flexoes) flexoes.hidden = !FRASES.some((f) => f.grupo === id && temGenero(f));
  };
  if (abas.length) abrirAba(fraseDoId(estado.frase).grupo);
  abas.forEach((b) => b.addEventListener('click', () => abrirAba(b.dataset.molduraAba!)));

  const escreverFlexao = () =>
    raiz.querySelectorAll<HTMLElement>('[data-moldura-texto]').forEach((el) => {
      el.textContent = textoDaFrase(fraseDoId(el.dataset.molduraTexto!), estado.flexao);
    });
  escreverFlexao();

  raiz.querySelectorAll<HTMLInputElement>('input[name="frase"]').forEach((r) =>
    r.addEventListener('change', () => {
      if (!r.checked) return;
      estado.frase = r.value;
      estado.fraseNaMao = true;
      // A frase puxa o anel dela ("Sou bi" traz a bandeira bi) enquanto a pessoa não escolheu um anel
      // na mão. Um grito nunca tira do lugar uma bandeira que outra frase trouxe.
      const puxa = fraseDoId(r.value).anel;
      const trocaBandeiraPorCor = puxa && anelDoId(puxa).grupo === 'chapa' && anelDoId(estado.anel).grupo !== 'chapa';
      if (puxa && !estado.anelNaMao && !trocaBandeiraPorCor) {
        estado.anel = puxa;
        marcar('anel', puxa);
      }
      redesenhar();
    }),
  );
  raiz.querySelectorAll<HTMLInputElement>('input[name="anel"]').forEach((r) =>
    r.addEventListener('change', () => {
      if (!r.checked) return;
      estado.anel = r.value;
      estado.anelNaMao = true;
      redesenhar();
    }),
  );
  raiz.querySelectorAll<HTMLInputElement>('input[name="flexao"]').forEach((r) =>
    r.addEventListener('change', () => {
      if (!r.checked) return;
      estado.flexao = r.value as Flexao;
      escreverFlexao();
      redesenhar();
    }),
  );
  raiz.querySelectorAll<HTMLInputElement>('input[name="formato"]').forEach((r) =>
    r.addEventListener('change', () => {
      if (!r.checked) return;
      estado.formato = r.value as Formato;
      estado.dx = 0;
      estado.dy = 0;
      canvas.dataset.formato = r.value;
      redesenhar();
    }),
  );
  zoom?.addEventListener('input', () => { estado.zoom = Number(zoom.value); redesenhar(); });
  if (estado.foto) acoes.forEach((b) => (b.disabled = false));

  // Arrastar a foto dentro do quadro (dedo ou mouse).
  let ultimo: { x: number; y: number } | null = null;
  canvas.addEventListener('pointerdown', (e) => {
    if (!estado.foto) return;
    ultimo = { x: e.clientX, y: e.clientY };
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!ultimo) return;
    // dx e dy são frações do diâmetro da foto (em px de tela: ~77% da largura no perfil, ~66% nos outros)
    const lado = canvas.getBoundingClientRect().width * (estado.formato === 'perfil' ? 0.766 : 0.662);
    estado.dx += (e.clientX - ultimo.x) / lado;
    estado.dy += (e.clientY - ultimo.y) / lado;
    ultimo = { x: e.clientX, y: e.clientY };
    redesenhar();
  });
  const soltar = () => (ultimo = null);
  canvas.addEventListener('pointerup', soltar);
  canvas.addEventListener('pointercancel', soltar);

  raiz.querySelector('[data-moldura-baixar]')?.addEventListener('click', async () => {
    baixar(await arquivo(canvas));
    aviso('Foto baixada. Agora é só postar.', 'bi-download');
  });
  raiz.querySelector('[data-moldura-postar]')?.addEventListener('click', async () => {
    const f = await arquivo(canvas);
    const text = montarMensagem({ corpo: corpoDoVoto(), url: urlAbsoluta(route('/')), tom: 'voto' });
    if (navigator.canShare?.({ files: [f] })) {
      try {
        await navigator.share({ files: [f], text });
      } catch {
        /* a pessoa fechou o menu */
      }
      return;
    }
    baixar(f);
    aviso('Seu aparelho não posta direto: a foto foi baixada.', 'bi-download');
  });
}

function iniciar() {
  const raiz = document.querySelector<HTMLElement>('main [data-moldura]');
  if (raiz) ligarMoldura(raiz);
}

if (typeof document !== 'undefined') {
  iniciar();
  document.addEventListener('astro:page-load', iniciar);
}
