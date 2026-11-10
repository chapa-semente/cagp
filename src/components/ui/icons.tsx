// src/components/ui/icons.tsx — Ícones React do sistema único (Phosphor Bold).
//
// Os componentes vendorizados (neobrutalism.com, BoldKit) e as ilhas do site importavam lucide-react.
// Este módulo mantém os mesmos nomes, mas desenha Phosphor Bold: um traço só no site inteiro.
// Ícone novo: importe daqui (ou direto de '@phosphor-icons/react' com weight="bold").
import * as React from 'react';
import * as P from '@phosphor-icons/react';
import type { Icon as PhosphorIcon, IconProps } from '@phosphor-icons/react';

export { createLucideIcon } from 'lucide-react';

export interface CagpIconProps extends Omit<IconProps, 'weight'> {
  /** Aceito por compatibilidade com lucide; o peso é sempre Bold. */
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}

const make = (Base: PhosphorIcon, name: string, weight: IconProps['weight'] = 'bold') => {
  const C = React.forwardRef<SVGSVGElement, CagpIconProps>(
    ({ size = 24, strokeWidth: _sw, absoluteStrokeWidth: _abs, ...props }, ref) => (
      <Base ref={ref} size={size} weight={weight} {...props} />
    ),
  );
  C.displayName = name;
  return C;
};

export const AlertCircle = make(P.WarningCircle, 'AlertCircle');
export const AlertTriangle = make(P.Warning, 'AlertTriangle');
export const TriangleAlert = AlertTriangle;
export const ArrowDown = make(P.ArrowDown, 'ArrowDown');
export const ArrowLeft = make(P.ArrowLeft, 'ArrowLeft');
export const ArrowRight = make(P.ArrowRight, 'ArrowRight');
export const ArrowUp = make(P.ArrowUp, 'ArrowUp');
export const ArrowUpDown = make(P.ArrowsDownUp, 'ArrowUpDown');
export const ArrowUpRight = make(P.ArrowUpRight, 'ArrowUpRight');
export const Ban = make(P.Prohibit, 'Ban');
export const Bell = make(P.Bell, 'Bell');
export const Building = make(P.BuildingOffice, 'Building');
export const CalendarIcon = make(P.CalendarBlank, 'CalendarIcon');
export const Check = make(P.Check, 'Check');
export const CheckCircle2 = make(P.CheckCircle, 'CheckCircle2');
export const CircleCheck = CheckCircle2;
export const ChevronDown = make(P.CaretDown, 'ChevronDown');
export const ChevronLeft = make(P.CaretLeft, 'ChevronLeft');
export const ChevronRight = make(P.CaretRight, 'ChevronRight');
export const ChevronsUpDown = make(P.CaretUpDown, 'ChevronsUpDown');
export const ChevronUp = make(P.CaretUp, 'ChevronUp');
export const Circle = make(P.Circle, 'Circle', 'fill');
export const CircleX = make(P.XCircle, 'CircleX');
export const Clock = make(P.Clock, 'Clock');
export const Construction = make(P.Barricade, 'Construction');
export const Copy = make(P.Copy, 'Copy');
export const CreditCard = make(P.CreditCard, 'CreditCard');
export const Dot = make(P.Dot, 'Dot', 'fill');
export const Download = make(P.DownloadSimple, 'Download');
export const Eye = make(P.Eye, 'Eye');
export const EyeOff = make(P.EyeSlash, 'EyeOff');
export const File = make(P.File, 'File');
export const FileAudio = make(P.FileAudio, 'FileAudio');
export const FileCode = make(P.FileCode, 'FileCode');
export const FileQuestion = make(P.FileX, 'FileQuestion');
export const FileText = make(P.FileText, 'FileText');
export const FileVideo = make(P.FileVideo, 'FileVideo');
export const Folder = make(P.Folder, 'Folder');
export const FolderOpen = make(P.FolderOpen, 'FolderOpen');
export const GripVertical = make(P.DotsSixVertical, 'GripVertical');
export const HelpCircle = make(P.Question, 'HelpCircle');
export const Home = make(P.House, 'Home');
export const Image = make(P.Image, 'Image');
export const Inbox = make(P.Tray, 'Inbox');
export const Info = make(P.Info, 'Info');
export const Key = make(P.Key, 'Key');
export const Link2 = make(P.LinkSimple, 'Link2');
export const List = make(P.List, 'List');
export const LoaderCircle = make(P.CircleNotch, 'LoaderCircle');
export const Lock = make(P.LockSimple, 'Lock');
export const Mail = make(P.EnvelopeSimple, 'Mail');
export const MapPin = make(P.MapPin, 'MapPin');
export const Maximize = make(P.ArrowsOut, 'Maximize');
export const MessageCircle = make(P.ChatCircle, 'MessageCircle');
export const MessageSquare = make(P.Chat, 'MessageSquare');
export const Minus = make(P.Minus, 'Minus');
export const Monitor = make(P.Monitor, 'Monitor');
export const MoreHorizontal = make(P.DotsThree, 'MoreHorizontal');
export const Palette = make(P.Palette, 'Palette');
export const PanelLeft = make(P.SidebarSimple, 'PanelLeft');
export const PartyPopper = make(P.Confetti, 'PartyPopper');
export const Pause = make(P.Pause, 'Pause');
export const Phone = make(P.Phone, 'Phone');
export const Play = make(P.Play, 'Play');
export const Plus = make(P.Plus, 'Plus');
export const PlusCircle = make(P.PlusCircle, 'PlusCircle');
export const Printer = make(P.Printer, 'Printer');
export const Quote = make(P.Quotes, 'Quote');
export const RefreshCw = make(P.ArrowsClockwise, 'RefreshCw');
export const RotateCcw = make(P.ArrowCounterClockwise, 'RotateCcw');
export const Save = make(P.FloppyDisk, 'Save');
export const Search = make(P.MagnifyingGlass, 'Search');
export const Send = make(P.PaperPlaneTilt, 'Send');
export const ServerCrash = make(P.HardDrives, 'ServerCrash');
export const Settings2 = make(P.SlidersHorizontal, 'Settings2');
export const Shield = make(P.Shield, 'Shield');
export const ShieldX = make(P.ShieldWarning, 'ShieldX');
export const ShoppingCart = make(P.ShoppingCart, 'ShoppingCart');
export const Sparkles = make(P.Sparkle, 'Sparkles');
export const Star = make(P.Star, 'Star');
export const Sun = make(P.Sun, 'Sun');
export const Target = make(P.Target, 'Target');
export const Trash2 = make(P.Trash, 'Trash2');
export const TrendingDown = make(P.TrendDown, 'TrendingDown');
export const TrendingUp = make(P.TrendUp, 'TrendingUp');
export const Upload = make(P.UploadSimple, 'Upload');
export const User = make(P.User, 'User');
export const Users = make(P.Users, 'Users');
export const Wifi = make(P.WifiHigh, 'Wifi');
export const WifiOff = make(P.WifiSlash, 'WifiOff');
export const Wrench = make(P.Wrench, 'Wrench');
export const X = make(P.X, 'X');
export const XIcon = X;
export const Zap = make(P.Lightning, 'Zap');
export const ZoomIn = make(P.MagnifyingGlassPlus, 'ZoomIn');
export const ZoomOut = make(P.MagnifyingGlassMinus, 'ZoomOut');
