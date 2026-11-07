import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  TriangleShape, DiamondBadge, PentagonShape, HexagonShape, OctagonShape,
  CrossShape, TrapezoidShape, ParallelogramShape, Star4Shape, Star5Shape,
  Star6Shape, BurstShape, ExplosionShape, SplatShape, LightningShape,
  BlobShape, WaveShape, CloudShape, HeartShape, AppleShape,
  SunShape, CrescentShape, RainbowShape, PlanetShape, UmbrellaShape,
  ArrowBadge, ZigzagBanner, RibbonShape, ShieldShape, TagShape,
  PriceTagShape, TicketShape, CouponShape, BookmarkShape, FlagShape,
  PillShape, SpeechBubble, CursorShape, EyeShape, GearShape,
  RhombusShape, EllipseShape
} from '../shapes';
import { Check, Copy } from 'lucide-react';

const SHAPES = [
  { id: 'triangle', name: 'Triangle', Component: TriangleShape, category: 'Geometric' },
  { id: 'diamond', name: 'Diamond', Component: DiamondBadge, category: 'Geometric' },
  { id: 'pentagon', name: 'Pentagon', Component: PentagonShape, category: 'Geometric' },
  { id: 'hexagon', name: 'Hexagon', Component: HexagonShape, category: 'Geometric' },
  { id: 'octagon', name: 'Octagon', Component: OctagonShape, category: 'Geometric' },
  { id: 'cross', name: 'Cross', Component: CrossShape, category: 'Geometric' },
  { id: 'trapezoid', name: 'Trapezoid', Component: TrapezoidShape, category: 'Geometric' },
  { id: 'parallelogram', name: 'Parallelogram', Component: ParallelogramShape, category: 'Geometric' },
  { id: 'star4', name: 'Star 4', Component: Star4Shape, category: 'Stars' },
  { id: 'star5', name: 'Star 5', Component: Star5Shape, category: 'Stars' },
  { id: 'star6', name: 'Star 6', Component: Star6Shape, category: 'Stars' },
  { id: 'burst', name: 'Burst', Component: BurstShape, category: 'Stars' },
  { id: 'explosion', name: 'Explosion', Component: ExplosionShape, category: 'Stars' },
  { id: 'splat', name: 'Splat', Component: SplatShape, category: 'Stars' },
  { id: 'lightning', name: 'Lightning', Component: LightningShape, category: 'Stars' },
  { id: 'blob', name: 'Blob', Component: BlobShape, category: 'Organic' },
  { id: 'wave', name: 'Wave', Component: WaveShape, category: 'Organic' },
  { id: 'cloud', name: 'Cloud', Component: CloudShape, category: 'Organic' },
  { id: 'heart', name: 'Heart', Component: HeartShape, category: 'Organic' },
  { id: 'apple', name: 'Apple', Component: AppleShape, category: 'Organic' },
  { id: 'sun', name: 'Sun', Component: SunShape, category: 'Celestial' },
  { id: 'crescent', name: 'Crescent', Component: CrescentShape, category: 'Celestial' },
  { id: 'rainbow', name: 'Rainbow', Component: RainbowShape, category: 'Celestial' },
  { id: 'planet', name: 'Planet', Component: PlanetShape, category: 'Celestial' },
  { id: 'umbrella', name: 'Umbrella', Component: UmbrellaShape, category: 'Celestial' },
  { id: 'arrow-badge', name: 'Arrow Badge', Component: ArrowBadge, category: 'Badges' },
  { id: 'zigzag', name: 'Zigzag', Component: ZigzagBanner, category: 'Badges' },
  { id: 'ribbon', name: 'Ribbon', Component: RibbonShape, category: 'Badges' },
  { id: 'shield', name: 'Shield', Component: ShieldShape, category: 'Badges' },
  { id: 'tag', name: 'Tag', Component: TagShape, category: 'Badges' },
  { id: 'price-tag', name: 'Price Tag', Component: PriceTagShape, category: 'Badges' },
  { id: 'ticket', name: 'Ticket', Component: TicketShape, category: 'Tickets' },
  { id: 'coupon', name: 'Coupon', Component: CouponShape, category: 'Tickets' },
  { id: 'bookmark', name: 'Bookmark', Component: BookmarkShape, category: 'Tickets' },
  { id: 'flag', name: 'Flag', Component: FlagShape, category: 'Communication' },
  { id: 'pill', name: 'Pill', Component: PillShape, category: 'Decorative' },
  { id: 'speech-bubble', name: 'Speech Bubble', Component: SpeechBubble, category: 'Communication' },
  { id: 'cursor', name: 'Cursor', Component: CursorShape, category: 'Mechanical' },
  { id: 'eye', name: 'Eye', Component: EyeShape, category: 'Mechanical' },
  { id: 'gear', name: 'Gear', Component: GearShape, category: 'Mechanical' },
  { id: 'rhombus', name: 'Rhombus', Component: RhombusShape, category: 'Geometric' },
  { id: 'ellipse', name: 'Ellipse', Component: EllipseShape, category: 'Geometric' },
];

const ANIMATIONS = ['none', 'spin', 'pulse', 'float', 'wiggle', 'bounce', 'glitch', 'spin-step'] as const;

export function ShapeBuilder({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = React.useState('triangle');
  const [size, setSize] = React.useState(120);
  const [strokeWidth, setStrokeWidth] = React.useState(2);
  const [filled, setFilled] = React.useState(true);
  const [color, setColor] = React.useState('#8B1E2D');
  const [animation, setAnimation] = React.useState<typeof ANIMATIONS[number]>('none');
  const [speed, setSpeed] = React.useState<'slow' | 'normal' | 'fast'>('normal');
  const [copied, setCopied] = React.useState(false);

  const currentShape = SHAPES.find(s => s.id === selectedId) || SHAPES[0];
  const ShapeComp = currentShape.Component;

  const generatedCode = `<${ShapeComp.name}
  size={${size}}
  strokeWidth={${strokeWidth}}
  filled={${filled}}
  color="${color}"${animation !== 'none' ? `\n  animation="${animation}"\n  speed="${speed}"` : ''}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("max-w-5xl mx-auto p-6 bg-white border-4 border-black shadow-xl", className)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-black pb-4 mb-6">
        <div>
          <h2 className="text-3xl font-black font-mono">Tool 01: SHAPEBUILDER</h2>
          <p className="text-sm font-medium text-neutral-600">42 shapes · 7 animations · Dial in every prop and copy the code.</p>
        </div>
        <Button onClick={copyCode} className="bg-cagp-gold text-black font-bold border-2 border-black shadow-md">
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copiado!' : 'Copiar Código'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <Label className="font-bold font-mono text-sm">Selecione o Shape (42 disponíveis):</Label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="mt-1 w-full border-2 border-black p-2 font-mono text-sm bg-neutral-50 shadow-sm"
            >
              {SHAPES.map(s => (
                <option key={s.id} value={s.id}>{s.category}: {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold font-mono mb-1">
              <span>Tamanho (Size): {size}px</span>
            </div>
            <Slider value={[size]} min={40} max={240} step={4} onValueChange={(v: any) => setSize(Array.isArray(v) ? v[0] : (v || 120))} />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold font-mono mb-1">
              <span>Espessura da Borda (Stroke): {strokeWidth}px</span>
            </div>
            <Slider value={[strokeWidth]} min={1} max={6} step={1} onValueChange={(v: any) => setStrokeWidth(Array.isArray(v) ? v[0] : (v || 2))} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="filled-toggle" className="font-bold font-mono text-sm">Preenchimento (Filled):</Label>
            <Switch id="filled-toggle" checked={filled} onCheckedChange={setFilled} />
          </div>

          <div>
            <Label className="font-bold font-mono text-sm">Cor:</Label>
            <div className="flex gap-2 mt-1">
              {['#8B1E2D', '#E8A317', '#1E3F66', '#15803D', '#5B2A86', '#0A0A0A'].map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn("w-8 h-8 border-2 border-black", color === c ? "ring-2 ring-offset-2 ring-black" : "")}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <Label className="font-bold font-mono text-sm">Animação:</Label>
            <select
              value={animation}
              onChange={(e) => setAnimation(e.target.value as any)}
              className="mt-1 w-full border-2 border-black p-2 font-mono text-sm bg-neutral-50 shadow-sm"
            >
              {ANIMATIONS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Preview */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-8 bg-neutral-100 border-3 border-black shadow-inner min-h-[300px]">
          <div className="p-4 bg-white border-2 border-black shadow-md flex items-center justify-center min-w-[200px] min-h-[200px]">
            <ShapeComp
              size={size}
              strokeWidth={strokeWidth}
              filled={filled}
              color={color}
              animation={animation}
              speed={speed}
            />
          </div>
          <pre className="mt-4 p-3 bg-neutral-900 text-green-400 font-mono text-xs w-full overflow-x-auto border-2 border-black">
            {generatedCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
