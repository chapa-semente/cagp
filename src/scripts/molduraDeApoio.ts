// src/scripts/molduraDeApoio.ts — A moldura de apoio (decisão do Gabriel em 11/11/2026).
//
// A pessoa escolhe uma foto dela, uma moldura da campanha ("Gostosas com Chapa 2", "Faz o S!", "As BB
// quer Semente"…) e um formato (perfil, feed ou story), e baixa ou posta. Tudo é desenhado num <canvas>
// aqui no navegador: a foto não sai do aparelho e nada vai para servidor nenhum.
// Molduras em src/data/molduras.json; marcação em src/pages/chapa-semente/moldura.astro.
import dados from '@/data/molduras.json';
import { corpoDoVoto, montarMensagem, urlAbsoluta } from '@/lib/compartilhar';
import { asset, route } from '@/lib/paths';
import { FOLHA_PATH } from '@/lib/sementeGeometry';
import { guardarFotoNoPerfil, lerFotoDoPerfil } from '@/lib/fotoDoPerfil';

type Formato = 'perfil' | 'feed' | 'story';
interface Moldura {
  id: string;
  linhas: string[];
  cor: keyof typeof CORES;
  circularS?: boolean;
}

const TINTA = '#1F1F1F';
const LARANJA = '#FE8812';
const ROXO = '#5B2A85';
const FORMATOS: Record<Formato, [number, number]> = { perfil: [1080, 1080], feed: [1080, 1350], story: [1080, 1920] };
/** Cor da faixa, tom mais fundo para a folha e se a faixa é clara (logo colorido e texto grafite). */
const CORES = {
  roxo: { bg: '#5B2A85', fundo: '#4A216E', claro: false },
  petroleo: { bg: '#266264', fundo: '#1D5052', claro: false },
  broto: { bg: '#6DB33F', fundo: '#5CA032', claro: true },
  fruto: { bg: '#FFC83D', fundo: '#F5B41F', claro: true },
  papel: { bg: '#FFFFFF', fundo: '#EFE7F6', claro: true },
  tinta: { bg: '#1F1F1F', fundo: '#33302B', claro: false },
} as const;
const MOLDURAS = dados.molduras as Moldura[];

const estado = {
  foto: null as HTMLImageElement | null,
  zoom: 1,
  dx: 0,
  dy: 0,
  moldura: MOLDURAS[0].id,
  formato: 'perfil' as Formato,
};
const logos: { claro?: HTMLImageElement; escuro?: HTMLImageElement } = {};

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
function escrever(c: CanvasRenderingContext2D, linha: string, x: number, y: number, corpo: number) {
  c.save();
  c.translate(x, y);
  c.rotate((-2 * Math.PI) / 180);
  c.font = `400 ${corpo}px 'Permanent Marker', cursive`;
  c.textAlign = 'center';
  c.lineJoin = 'round';
  c.lineWidth = corpo * 0.17;
  c.strokeStyle = TINTA;
  c.strokeText(linha, 0, 0);
  c.fillStyle = LARANJA;
  c.fillText(linha, 0, 0);
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
function medalhao(c: CanvasRenderingContext2D, cx: number, cy: number, R: number, m: Moldura) {
  const cor = CORES[m.cor];
  const anel = R * 0.23;
  const rFoto = R - anel;
  const u = R / 540;

  // o anel (um disco na cor da moldura; a foto entra por cima, no círculo de dentro)
  c.beginPath();
  c.arc(cx, cy, R, 0, Math.PI * 2);
  c.fillStyle = cor.bg;
  c.fill();

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
  } else {
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

  // o texto da moldura na base do anel, na caneta laranja
  const frase = m.linhas.join(' ');
  const raioTexto = R - anel * 0.5;
  let corpo = anel * 0.8;
  c.font = `400 ${corpo}px 'Permanent Marker', cursive`;
  const larguraArco = raioTexto * 2.35; // ~135° de arco
  const largura = c.measureText(frase).width * 1.04;
  if (largura > larguraArco) corpo *= larguraArco / largura;
  textoNoArco(c, frase, cx, cy, raioTexto, true, {
    fonte: `400 ${corpo}px 'Permanent Marker', cursive`,
    corpo,
    cor: LARANJA,
    contorno: TINTA,
    circularS: m.circularS ? (cor.claro ? ROXO : '#FFFFFF') : undefined,
  });

  // a eleição no alto do anel
  const corpoData = anel * 0.3;
  textoNoArco(c, 'ELEIÇÃO DO CAGP · 25 E 26/11', cx, cy, raioTexto, false, {
    fonte: `700 ${corpoData}px Poppins, sans-serif`,
    corpo: corpoData,
    cor: cor.claro ? TINTA : '#FFFFFF',
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
}

export function desenhar(canvas: HTMLCanvasElement) {
  const m = MOLDURAS.find((x) => x.id === estado.moldura) ?? MOLDURAS[0];
  const cor = CORES[m.cor];
  const [W, H] = FORMATOS[estado.formato];
  canvas.width = W;
  canvas.height = H;
  const c = canvas.getContext('2d')!;
  const u = W / 1080;

  // fundo: a cor da moldura com a folha grande, como nos banners
  c.fillStyle = cor.bg;
  c.fillRect(0, 0, W, H);
  c.save();
  c.translate(W * 0.9, H + W * 0.12);
  c.rotate((22 * Math.PI) / 180);
  c.scale(W * 0.0075, W * 0.0075);
  c.fillStyle = cor.fundo;
  c.fill(new Path2D(FOLHA_PATH));
  c.restore();

  if (estado.formato === 'perfil') {
    // O aplicativo corta a foto de perfil num círculo inscrito no quadrado: o anel encosta na borda.
    medalhao(c, W / 2, H / 2, W * 0.497, m);
    return;
  }

  // Feed e story: o mesmo medalhão num cartaz, com o resto do grito e a assinatura embaixo.
  const story = estado.formato === 'story';
  const R = W * 0.43;
  const cy = story ? H * 0.37 : R + 70 * u;
  medalhao(c, W / 2, cy, R, m);

  const frase = m.linhas.join(' ');
  const resto = [frase.includes('Chapa 2') ? '' : 'Vote Chapa 2!', frase.includes('Faz o S') ? '' : 'Faz o S!'].filter(Boolean);
  const texto = cor.claro ? TINTA : '#FFFFFF';
  let y = cy + R + (story ? 190 : 118) * u;
  const medir = (linha: string, corpo: number) => {
    c.font = `400 ${corpo}px 'Permanent Marker', cursive`;
    return c.measureText(linha).width;
  };
  const linhas = story ? resto : [resto.join(' ')];
  for (const linha of linhas) {
    let corpo = (story ? 150 : 112) * u;
    corpo = Math.min(corpo, (corpo * W * 0.84) / medir(linha, corpo));
    escrever(c, linha, W / 2, y, corpo);
    y += corpo * 1.18;
  }

  // assinatura: logo oficial e a eleição (no story fica acima do rodapé do aplicativo)
  const base = story ? H - 300 * u : H - 64 * u;
  const logo = cor.claro ? logos.claro : logos.escuro;
  const alto = 84 * u;
  if (logo) c.drawImage(logo, W * 0.07, base - alto, (logo.naturalWidth / logo.naturalHeight) * alto, alto);
  c.fillStyle = texto;
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
      (blob) => (blob ? ok(new File([blob], `chapa-2-${estado.moldura}-${estado.formato}.jpg`, { type: 'image/jpeg' })) : erro(new Error('sem imagem'))),
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

/** Liga a ferramenta numa marcação `[data-moldura]` (a página da moldura ou a última tela do tour). */
export function ligarMoldura(raiz: HTMLElement) {
  if (raiz.dataset.ligado) return;
  raiz.dataset.ligado = '1';
  // Sem seletor de formato na marcação (tour), a moldura é a de perfil.
  if (!raiz.querySelector('input[name="formato"]')) estado.formato = 'perfil';
  estado.moldura = raiz.querySelector<HTMLInputElement>('input[name="moldura"]:checked')?.value ?? MOLDURAS[0].id;
  if (estado.foto) raiz.dataset.temFoto = '1';
  const canvas = raiz.querySelector<HTMLCanvasElement>('canvas')!;
  const entrada = raiz.querySelector<HTMLInputElement>('[data-moldura-foto]')!;
  const zoom = raiz.querySelector<HTMLInputElement>('[data-moldura-zoom]');
  const acoes = raiz.querySelectorAll<HTMLButtonElement>('[data-moldura-baixar], [data-moldura-postar]');
  const redesenhar = () => desenhar(canvas);

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

  raiz.querySelectorAll<HTMLInputElement>('input[name="moldura"]').forEach((r) =>
    r.addEventListener('change', () => { if (r.checked) { estado.moldura = r.value; redesenhar(); } }),
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
