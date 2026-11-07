import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Sticker, Stamp } from '../ui/sticker';
import { Halftone } from '../boldkit/canvas-effects/Halftone';
import { MouseRipple } from '../boldkit/canvas-effects/MouseRipple';
import { BurstShape, RibbonShape, Star4Shape } from '../boldkit/shapes';
import { AsciiGeodesicDome } from '../boldkit/ascii-shapes';
import { asset } from '../../lib/paths';

export const SobreCollageBanner: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'candangos' | 'semente' | 'ufmg'>('candangos');

  return (
    <section
      aria-label="Síntese Semiótica e Colagem Institucional CAGP + Semente + UFMG"
      className="mb-6"
    >
      <Card className="relative overflow-hidden border-3 border-border shadow-lg bg-card">
        {/* Efeito de Canvas Interativo: Halftone + MouseRipple (BoldKit) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          aria-hidden="true"
        >
          <Halftone color="#9E2424" maxRadius={9} spacing={20} speed={0.7} />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        >
          <MouseRipple color="#5B2A86" speed={1} />
        </div>

        <CardContent className="relative z-10 p-5 sm:p-7 space-y-6">
          {/* Topo: Seletor de Camadas de Identidade Visual */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-3 border-border">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Sticker variant="primary" size="sm" rotation="slight">
                  TRÍADE IDENTITÁRIA
                </Sticker>
                <Badge variant="secondary">Post-Modern Academic Collage</Badge>
                <Badge variant="accent">Neobrutalism rL9Ap</Badge>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-foreground m-0 mt-1">
                Semiótica &amp; Memória Visual: Candangos • Semente • UFMG
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={activeLayer === 'candangos' ? 'default' : 'outline'}
                onClick={() => setActiveLayer('candangos')}
              >
                1. Os Candangos (CAGP)
              </Button>
              <Button
                type="button"
                size="sm"
                variant={activeLayer === 'semente' ? 'secondary' : 'outline'}
                onClick={() => setActiveLayer('semente')}
              >
                2. Chapa Semente
              </Button>
              <Button
                type="button"
                size="sm"
                variant={activeLayer === 'ufmg' ? 'accent' : 'outline'}
                onClick={() => setActiveLayer('ufmg')}
              >
                3. Marca UFMG (1927)
              </Button>
            </div>
          </div>

          {/* Conteúdo Dinâmico da Camada Selecionada */}
          {activeLayer === 'candangos' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl border-3 border-border bg-[#f4f5f7] shadow-md relative">
                <BurstShape
                  size={56}
                  color="#9E2424"
                  shadow={false}
                  className="absolute -top-3 -left-3 rotate-12 opacity-80"
                />
                <img
                  src={asset('/logos/cagp/01_vertical_fundo_claro.svg')}
                  alt="Marca Oficial CAGP UFMG — Os Candangos de Bruno Giorgi (1959)"
                  className="w-40 h-40 object-contain rounded-xl border-2 border-border bg-white p-3 shadow-sm"
                />
                <div className="mt-3 text-center">
                  <Badge variant="default">Bruno Giorgi • 1959</Badge>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="dark" className="font-mono">Grid 1000×1000</Badge>
                  <Badge variant="outline" className="font-mono">Unidade X = 49px</Badge>
                  <Badge variant="default" className="font-mono">Rubro #9E2424</Badge>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-extrabold uppercase text-foreground m-0">
                  &ldquo;Dois Guerreiros&rdquo; (Os Candangos) — Praça dos Três Poderes
                </h3>
                <p className="font-sans text-xs sm:text-sm text-foreground leading-relaxed m-0">
                  O símbolo gráfico do <strong>CAGP</strong> estiliza em alto contraste a escultura em bronze de{' '}
                  <strong>Bruno Giorgi (1959)</strong>. Para a Gestão Pública na FAFICH/UFMG, o monumento lembra que o Estado e as políticas públicas não são abstrações burocráticas, mas construções coletivas erguidas pela força do trabalho e pela soberania popular. As duas linhas verticais delgadas representam o prumo técnico e o controle social democrático.
                </p>
              </div>
            </div>
          )}

          {activeLayer === 'semente' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl border-3 border-border bg-[#5B2A86] text-white shadow-md relative overflow-hidden">
                <Star4Shape
                  size={48}
                  color="#FF8811"
                  shadow={false}
                  className="absolute top-2 right-2 rotate-12"
                />
                <div className="w-24 h-24 rounded-2xl border-3 border-border bg-[#FF8811] p-2 shadow-sm flex items-center justify-center">
                  <img
                    src={asset('/logos/semente_logo_fundo_laranja.png')}
                    alt="Símbolo Chapa Semente"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div className="mt-4 inline-flex items-center px-4 py-1 rounded-full bg-white border-3 border-border shadow-xs font-heading font-black text-base uppercase tracking-wider text-[#5B2A86]">
                  SEM<span>E</span>NT<span className="text-[#FF8811]">E</span>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="font-mono">Roxo #5B2A86</Badge>
                  <Badge variant="accent" className="font-mono">Laranja #FF8811</Badge>
                  <Badge variant="teal" className="font-mono">Petróleo #266264</Badge>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-extrabold uppercase text-foreground m-0">
                  Colagem Acadêmica Pós-Moderna — Potencial que Germina em Ação
                </h3>
                <p className="font-sans text-xs sm:text-sm text-foreground leading-relaxed m-0">
                  A identidade da <strong>Chapa Semente</strong> equilibra o rigor analítico das políticas públicas com a energia da vivência universitária: arquitetura brutalista do campus em alto contraste, fitas laranjas vibrantes (<code>#FF8811</code>), casca protetora roxa (<code>#5B2A86</code>) simbolizando a diversidade de vozes e a semente central representando o protagonismo discente.
                </p>
              </div>
            </div>
          )}

          {activeLayer === 'ufmg' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl border-3 border-border bg-white shadow-md relative">
                <div className="flex items-baseline gap-1 select-none py-3">
                  <span className="font-serif font-bold text-5xl text-black">U</span>
                  <span className="font-serif font-bold text-5xl text-black">F</span>
                  <span className="inline-flex flex-col items-center mx-1">
                    <span className="font-serif italic font-black text-5xl text-[#C4161C] leading-none">
                      M
                    </span>
                    <span className="w-full h-1.5 bg-[#C4161C] block mt-0.5"></span>
                  </span>
                  <span className="font-serif font-bold text-5xl text-black">G</span>
                </div>
                <Badge variant="ufmg" className="mt-2 font-mono">
                  CEDECOM • Fundada em 1927
                </Badge>
              </div>

              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="ufmg" className="font-mono">Vermelho #C4161C</Badge>
                  <Badge variant="dark" className="font-mono">Contraste 21:1 AAA</Badge>
                  <Badge variant="outline" className="font-mono">Didone + Cursiva</Badge>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-extrabold uppercase text-foreground m-0">
                  Tensão Tipográfica: Solidez Romana vs. Gesto Humanista das Minas Gerais
                </h3>
                <p className="font-sans text-xs sm:text-sm text-foreground leading-relaxed m-0">
                  Conforme o manual oficial do <strong>CEDECOM/UFMG</strong>, as letras <strong>U</strong>, <strong>F</strong> e <strong>G</strong> em estilo romano clássico (Didone/Bodoni) evocam o rigor científico e o patrimônio público desde 1927, enquanto a letra <strong>M</strong> caligráfica cursiva em vermelho rubro (<code>#C4161C</code>) apoiada sobre a barra retangular expressa a inquietude criativa, a pluralidade e a cultura viva da universidade.
                </p>
              </div>
            </div>
          )}

          {/* Rodapé Artístico com ASCII Shape (BoldKit) + Stamp */}
          <div className="pt-4 border-t-2 border-border/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center rounded-xl border-2 border-border bg-[#16181d] text-[#FF8811] p-1.5 overflow-hidden">
                <AsciiGeodesicDome size="sm" animated={false} />
              </div>
              <div className="text-xs font-sans text-muted-foreground">
                <strong className="text-foreground font-heading uppercase block">
                  Engenharia Visual Canônica • WCAG 2.1 AAA
                </strong>
                <span>Bordas de 3px • Raio 0.75rem • Bricolage Grotesque &amp; Space Grotesk</span>
              </div>
            </div>

            <RibbonShape size={42} color="#FF8811" shadow={false} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
