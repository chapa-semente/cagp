// src/components/ui/icons.tsx — Ícones React do sistema único (Phosphor Bold).
//
// Os componentes vendorizados (neobrutalism.com, BoldKit) e as ilhas do site importavam lucide-react.
// Este módulo mantém os mesmos nomes, mas desenha Phosphor Bold: um traço só no site inteiro.
// Ícone novo: acrescente uma linha make(...) com o nome do ícone no Phosphor (ex.: arrow-left) e o nome
// React, e rode node scripts/build-icons.mjs.
import * as React from 'react';
import { ICON_PATHS, type IconKey } from './iconPaths.generated';

export { createLucideIcon } from 'lucide-react';

export interface CagpIconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'color'> {
  size?: number | string;
  color?: string;
  /** Aceitos por compatibilidade com lucide e Phosphor; o peso é sempre Bold. */
  weight?: string;
  mirrored?: boolean;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}

// Cada ícone é só o desenho Bold (gerado por scripts/build-icons.mjs em iconPaths.generated.ts).
// Antes o módulo importava @phosphor-icons/react, que traz os seis pesos de cada ícone: 227 KB.
const make = (key: IconKey, name: string) => {
  const C = React.forwardRef<SVGSVGElement, CagpIconProps>(
    ({ size = 24, color = 'currentColor', weight: _w, mirrored, strokeWidth: _sw, absoluteStrokeWidth: _abs, style, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={size}
        height={size}
        fill={color}
        style={mirrored ? { transform: 'scaleX(-1)', ...style } : style}
        {...props}
        dangerouslySetInnerHTML={{ __html: ICON_PATHS[key] }}
      />
    ),
  );
  C.displayName = name;
  return C;
};

export const AlertCircle = make('warning-circle', 'AlertCircle');
export const AlertTriangle = make('warning', 'AlertTriangle');
export const TriangleAlert = AlertTriangle;
export const ArrowDown = make('arrow-down', 'ArrowDown');
export const ArrowLeft = make('arrow-left', 'ArrowLeft');
export const ArrowRight = make('arrow-right', 'ArrowRight');
export const ArrowUp = make('arrow-up', 'ArrowUp');
export const ArrowUpDown = make('arrows-down-up', 'ArrowUpDown');
export const ArrowUpRight = make('arrow-up-right', 'ArrowUpRight');
export const Ban = make('prohibit', 'Ban');
export const Bell = make('bell', 'Bell');
export const Building = make('building-office', 'Building');
export const CalendarIcon = make('calendar-blank', 'CalendarIcon');
export const Check = make('check', 'Check');
export const CheckCircle2 = make('check-circle', 'CheckCircle2');
export const CircleCheck = CheckCircle2;
export const ChevronDown = make('caret-down', 'ChevronDown');
export const ChevronLeft = make('caret-left', 'ChevronLeft');
export const ChevronRight = make('caret-right', 'ChevronRight');
export const ChevronsUpDown = make('caret-up-down', 'ChevronsUpDown');
export const ChevronUp = make('caret-up', 'ChevronUp');
export const Circle = make('circle:fill', 'Circle');
export const CircleX = make('x-circle', 'CircleX');
export const Clock = make('clock', 'Clock');
export const Construction = make('barricade', 'Construction');
export const Copy = make('copy', 'Copy');
export const CreditCard = make('credit-card', 'CreditCard');
export const Dot = make('dot:fill', 'Dot');
export const Download = make('download-simple', 'Download');
export const Eye = make('eye', 'Eye');
export const EyeOff = make('eye-slash', 'EyeOff');
export const File = make('file', 'File');
export const FileAudio = make('file-audio', 'FileAudio');
export const FileCode = make('file-code', 'FileCode');
export const FileQuestion = make('file-x', 'FileQuestion');
export const FileText = make('file-text', 'FileText');
export const FileVideo = make('file-video', 'FileVideo');
export const Folder = make('folder', 'Folder');
export const FolderOpen = make('folder-open', 'FolderOpen');
export const GripVertical = make('dots-six-vertical', 'GripVertical');
export const HelpCircle = make('question', 'HelpCircle');
export const Home = make('house', 'Home');
export const Image = make('image', 'Image');
export const Inbox = make('tray', 'Inbox');
export const Info = make('info', 'Info');
export const Key = make('key', 'Key');
export const Link2 = make('link-simple', 'Link2');
export const List = make('list', 'List');
export const LoaderCircle = make('circle-notch', 'LoaderCircle');
export const Lock = make('lock-simple', 'Lock');
export const Mail = make('envelope-simple', 'Mail');
export const MapPin = make('map-pin', 'MapPin');
export const Maximize = make('arrows-out', 'Maximize');
export const MessageCircle = make('chat-circle', 'MessageCircle');
export const MessageSquare = make('chat', 'MessageSquare');
export const Minus = make('minus', 'Minus');
export const Monitor = make('monitor', 'Monitor');
export const MoreHorizontal = make('dots-three', 'MoreHorizontal');
export const Palette = make('palette', 'Palette');
export const PanelLeft = make('sidebar-simple', 'PanelLeft');
export const PartyPopper = make('confetti', 'PartyPopper');
export const Pause = make('pause', 'Pause');
export const Phone = make('phone', 'Phone');
export const Play = make('play', 'Play');
export const Plus = make('plus', 'Plus');
export const PlusCircle = make('plus-circle', 'PlusCircle');
export const Printer = make('printer', 'Printer');
export const Quote = make('quotes', 'Quote');
export const RefreshCw = make('arrows-clockwise', 'RefreshCw');
export const RotateCcw = make('arrow-counter-clockwise', 'RotateCcw');
export const Save = make('floppy-disk', 'Save');
export const Search = make('magnifying-glass', 'Search');
export const Send = make('paper-plane-tilt', 'Send');
export const ServerCrash = make('hard-drives', 'ServerCrash');
export const Settings2 = make('sliders-horizontal', 'Settings2');
export const Shield = make('shield', 'Shield');
export const ShieldX = make('shield-warning', 'ShieldX');
export const ShoppingCart = make('shopping-cart', 'ShoppingCart');
export const Sparkles = make('sparkle', 'Sparkles');
export const Star = make('star', 'Star');
export const Sun = make('sun', 'Sun');
export const Target = make('target', 'Target');
export const Trash2 = make('trash', 'Trash2');
export const TrendingDown = make('trend-down', 'TrendingDown');
export const TrendingUp = make('trend-up', 'TrendingUp');
export const Upload = make('upload-simple', 'Upload');
export const User = make('user', 'User');
export const Users = make('users', 'Users');
export const Wifi = make('wifi-high', 'Wifi');
export const WifiOff = make('wifi-slash', 'WifiOff');
export const Wrench = make('wrench', 'Wrench');
export const X = make('x', 'X');
export const XIcon = X;
export const Zap = make('lightning', 'Zap');
export const ZoomIn = make('magnifying-glass-plus', 'ZoomIn');
export const ZoomOut = make('magnifying-glass-minus', 'ZoomOut');
