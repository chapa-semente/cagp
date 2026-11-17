#!/usr/bin/env python3
"""Extrai dos desenhos de referência (_referencias/desenhos) as peças que o site usa, em vetor.

Nada é redesenhado: cada peça sai dos próprios pixels do desenho (PIL separa pele, laranja e traço
preto; o potrace vetoriza). O vídeo "Chapa ✌" tem três desenhos diferentes do mesmo adesivo (quem
desenhou refez a estrela, as letras e a mão a cada quadro), e os três são guardados: alternar entre
eles no site é a animação quadro a quadro original.

Uso:  python3 scripts/desenhos/extrair-referencia.py <pasta-com-quadros> [--debug]
      (quadros: ffmpeg -i "<vídeo>" -vf fps=8 <pasta>/f%d.png ; a imagem da mão do rock é lida de
      _referencias/desenhos direto)
Precisa de: Pillow e potrace instalados. Saída: src/data/desenhosReferencia.json
"""
import json, re, subprocess, sys, tempfile, os
from PIL import Image, ImageChops, ImageDraw, ImageFilter

PASTA = sys.argv[1]
DEBUG = '--debug' in sys.argv
RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PELE = (253, 217, 181)
QUADROS = ['f1.png', 'f4.png', 'f6.png']          # os três desenhos distintos do vídeo
CAIXA_ADESIVO = (0, 660, 1406, 1828)               # a estrela inteira, no quadro de 1406×1828
CAIXA_MAO_V = (960, 1120, 1340, 1640)
# Na mão do V (quadro 1): onde o traço de baixo do polegar termina, e o contorno esquerdo da mão.
BARREIRA_POLEGAR = ((131, 303), (62, 318))
SEMENTE_POLEGAR = (110, 268)

def perto(img, rgb, tol):
    r, g, b = img.split()
    c = lambda canal, v: canal.point(lambda p: 255 if abs(p - v) <= tol else 0)
    return ImageChops.multiply(ImageChops.multiply(c(r, rgb[0]), c(g, rgb[1])), c(b, rgb[2]))

def escuro(img, lim): return img.convert('L').point(lambda p: 255 if p < lim else 0)
def dil(m, k): return m.filter(ImageFilter.MaxFilter(k))
def ero(m, k): return m.filter(ImageFilter.MinFilter(k))
def e(a, b): return ImageChops.multiply(a, b)
def ou(a, b): return ImageChops.lighter(a, b)
def nao(a): return ImageChops.invert(a)

def componente(mask, semente):
    m = mask.copy().convert('L'); ImageDraw.floodfill(m, semente, 128)
    return m.point(lambda p: 255 if p == 128 else 0)

def laranja(img):
    r, g, b = img.split()
    return e(e(r.point(lambda p: 255 if p > 200 else 0), g.point(lambda p: 255 if 90 < p < 175 else 0)), b.point(lambda p: 255 if p < 95 else 0))

def vetor(mask, turd=6):
    with tempfile.TemporaryDirectory() as d:
        bmp, svg = os.path.join(d, 'm.bmp'), os.path.join(d, 'm.svg')
        mask.point(lambda p: 0 if p else 255).convert('1').save(bmp)
        subprocess.run(['potrace', '-s', '-t', str(turd), '-a', '1.1', '-O', '1', '-u', '1', bmp, '-o', svg], check=True)
        return ' '.join(p.replace('\n', ' ') for p in re.findall(r'<path d="([^"]+)"', open(svg).read()))

def une(caixas):
    caixas = [c for c in caixas if c]
    return [min(c[0] for c in caixas), min(c[1] for c in caixas), max(c[2] for c in caixas), max(c[3] for c in caixas)]

def mao(img, semente, lim):
    """Pele (região que cresce a partir da semente, pulando o traço) e traço preto de uma mão."""
    pele_toda = perto(img, PELE, 34)
    assert pele_toda.getpixel(semente) == 255, img.getpixel(semente)
    reg = componente(pele_toda, semente)
    for _ in range(6):
        reg = e(pele_toda, dil(reg, 27))
    traco = e(escuro(img, lim), dil(reg, 15))
    return reg, ou(dil(reg, 7), traco), traco

saida = {'_comentario': 'Gerado por scripts/desenhos/extrair-referencia.py a partir de _referencias/desenhos. Caminhos do potrace: aplicar translate(0,h) scale(1,-1). Não editar à mão.'}

# ---- O adesivo "Chapa ✌" do vídeo, nos três desenhos ----
adesivo = {'w': CAIXA_ADESIVO[2] - CAIXA_ADESIVO[0], 'h': CAIXA_ADESIVO[3] - CAIXA_ADESIVO[1], 'quadros': []}
maoV = {'w': CAIXA_MAO_V[2] - CAIXA_MAO_V[0], 'h': CAIXA_MAO_V[3] - CAIXA_MAO_V[1],
        'x': CAIXA_MAO_V[0] - CAIXA_ADESIVO[0], 'y': CAIXA_MAO_V[1] - CAIXA_ADESIVO[1], 'quadros': []}
caixas_v, caixas_a = [], []
for nome in QUADROS:
    inteiro = Image.open(os.path.join(PASTA, nome)).convert('RGB')
    # mão do V
    v = inteiro.crop(CAIXA_MAO_V)
    pele = perto(v, PELE, 34)
    semente = next((x, y) for y in range(330, 420, 4) for x in range(120, 260, 4) if pele.getpixel((x, y)) == 255)
    reg, cheio, traco = mao(v, semente, 80)
    maoV['quadros'].append({'fill': vetor(cheio), 'ink': vetor(traco, 3)})
    caixas_v.append(cheio.getbbox())
    if nome == QUADROS[0]:
        # O polegar sozinho, para ficar POR CIMA do que a mão segura (nota, celular, certificado).
        # A base do polegar é aberta no desenho; uma barreira fecha a passagem para a palma.
        pele_v = perto(v, PELE, 34)
        ImageDraw.Draw(pele_v).line([BARREIRA_POLEGAR[0], BARREIRA_POLEGAR[1]], fill=0, width=5)
        polegar = componente(pele_v, SEMENTE_POLEGAR)
        traco_p = e(traco, dil(polegar, 11))
        maoV['polegar'] = {'fill': vetor(ou(dil(polegar, 5), traco_p)), 'ink': vetor(traco_p, 3)}
        if DEBUG: Image.merge('RGB', (traco_p, polegar, traco)).save(os.path.join(PASTA, 'dbg-polegar.png'))
    # estrela: o laranja, com os buracos (letras, mão) tapados
    a = inteiro.crop(CAIXA_ADESIVO)
    lar = laranja(a)
    reg_mao = Image.new('L', a.size, 0); reg_mao.paste(dil(reg, 15), (maoV['x'], maoV['y']))
    base = ou(lar, reg_mao)
    fora = componente(nao(dil(base, 5)), (2, a.height - 2))          # fundo, a partir do canto de baixo
    sil = dil(ero(nao(fora), 5), 5)                                     # vai até o meio do traço preto
    letras = e(e(escuro(a, 80), ero(sil, 25)), nao(dil(reg_mao, 9)))
    # O contorno da estrela é o próprio caminho, traçado no SVG (stroke): não precisa de um segundo caminho.
    adesivo['quadros'].append({'fill': vetor(sil), 'letras': vetor(letras, 4)})
    caixas_a.append(sil.getbbox())
    if DEBUG:
        Image.merge('RGB', (sil, sil, letras)).save(os.path.join(PASTA, f'dbg-adesivo-{nome}'))
        Image.merge('RGB', (traco, reg, cheio)).save(os.path.join(PASTA, f'dbg-v-{nome}'))
adesivo['caixa'] = une(caixas_a)
maoV['caixa'] = une(caixas_v)
saida['adesivo'] = adesivo
saida['maoV'] = maoV

# ---- Os tracinhos de ênfase (só existem no quadro da piscada) ----
inteiro = Image.open(os.path.join(PASTA, 'f6.png')).convert('RGB')
colorido = ou(laranja(inteiro), perto(inteiro, PELE, 40))
tracos = []
for caixa in [(1100, 400, 1406, 900), (0, 1010, 245, 1270)]:
    rec, cor = escuro(inteiro, 70).crop(caixa), dil(colorido, 9).crop(caixa)
    fica = Image.new('L', rec.size, 0)
    resto = rec.copy()
    while True:                                   # um componente escuro por vez: fica só o que não encosta em figura
        bb = resto.getbbox()
        if not bb: break
        x = next(x for x in range(bb[0], bb[2]) if resto.getpixel((x, bb[1])))
        comp = componente(resto, (x, bb[1]))
        resto = e(resto, nao(comp))
        area = comp.histogram()[255]
        toca_borda = comp.getbbox()[0] == 0 or comp.getbbox()[2] == rec.width or comp.getbbox()[1] == 0 or comp.getbbox()[3] == rec.height
        if 300 < area < 9000 and not toca_borda and not e(dil(comp, 5), cor).getbbox():
            fica = ou(fica, comp)
    bb = fica.getbbox()
    if not bb: continue
    fica = fica.crop((bb[0] - 6, bb[1] - 6, bb[2] + 6, bb[3] + 6))
    # x, y: onde o grupo fica em relação à caixa do adesivo (para remontar o desenho original)
    tracos.append({'w': fica.width, 'h': fica.height, 'x': caixa[0] + bb[0] - 6 - CAIXA_ADESIVO[0], 'y': caixa[1] + bb[1] - 6 - CAIXA_ADESIVO[1], 'ink': vetor(fica, 3)})
    if DEBUG: fica.save(os.path.join(PASTA, f'dbg-tracos-{len(tracos)}.png'))
saida['tracos'] = tracos

# ---- A mão do rock (imagem parada) ----
ref = Image.open(os.path.join(RAIZ, '_referencias/desenhos/WhatsApp Image 2026-11-12 at 17.43.08.jpeg')).convert('RGB').crop((640, 860, 1010, 1260))
reg, cheio, traco = mao(ref, (200, 300), 22)
saida['maoRock'] = {'w': ref.width, 'h': ref.height, 'caixa': list(cheio.getbbox()), 'quadros': [{'fill': vetor(cheio), 'ink': vetor(traco, 3)}]}

destino = os.path.join(RAIZ, 'src/data/desenhosReferencia.json')
json.dump(saida, open(destino, 'w'), ensure_ascii=False)
print('ok', destino, os.path.getsize(destino), 'bytes;', len(tracos), 'grupos de tracinhos')
