import React, { useState, useEffect } from 'react'
import {
  Aurora,
  CRT,
  Dither,
  DotBlob,
  DotWave,
  FlowField,
  GodRays,
  GravityWells,
  Halftone,
  Lightning,
  LissajousGrid,
  MatrixRain,
  MeshGradient,
  Metaballs,
  MouseRipple,
  ParticleWeb,
  Plasma,
  PulsingBorder,
  Swirl,
  Topography,
  Truchet,
  VoronoiPulse,
  WarpSpeed,
} from '@/components/boldkit/canvas-effects'
import { getVaultItem } from '@/lib/storage/studentVault'

export type ShaderKey =
  | 'auto'
  | 'aurora'
  | 'crt'
  | 'dither'
  | 'dotblob'
  | 'dotwave'
  | 'flowfield'
  | 'godrays'
  | 'gravitywells'
  | 'halftone'
  | 'lightning'
  | 'lissajous'
  | 'matrixrain'
  | 'meshgradient'
  | 'metaballs'
  | 'mouseripple'
  | 'particleweb'
  | 'plasma'
  | 'pulsingborder'
  | 'swirl'
  | 'topography'
  | 'truchet'
  | 'voronoipulse'
  | 'warpspeed'

export const SHADER_OPTIONS: { id: ShaderKey; label: string }[] = [
  { id: 'auto', label: 'Automático (Por Eixo/Página)' },
  { id: 'dotwave', label: 'Dot Wave (Neobrutalismo)' },
  { id: 'topography', label: 'Curvas Topográficas' },
  { id: 'particleweb', label: 'Teia de Partículas' },
  { id: 'lissajous', label: 'Grade de Lissajous' },
  { id: 'aurora', label: 'Aurora Boreal' },
  { id: 'crt', label: 'Monitor Retrô CRT' },
  { id: 'dither', label: 'Dither Neobrutal' },
  { id: 'dotblob', label: 'Bolha Dinâmica de Pontos' },
  { id: 'flowfield', label: 'Campo de Vetores de Fluxo' },
  { id: 'godrays', label: 'Raios Solares / God Rays' },
  { id: 'gravitywells', label: 'Poços Gravitacionais' },
  { id: 'halftone', label: 'Reticulado Halftone' },
  { id: 'lightning', label: 'Arcos Elétricos / Lightning' },
  { id: 'matrixrain', label: 'Chuva Digital Matrix' },
  { id: 'meshgradient', label: 'Gradiente de Malha Dinâmica' },
  { id: 'metaballs', label: 'Metabolas Fluídicas' },
  { id: 'mouseripple', label: 'Ondulação Tátil / Ripple' },
  { id: 'plasma', label: 'Plasma Fluido' },
  { id: 'pulsingborder', label: 'Bordas Pulsantes' },
  { id: 'swirl', label: 'Redemoinho Cinético' },
  { id: 'truchet', label: 'Mosaico de Truchet' },
  { id: 'voronoipulse', label: 'Pulso Hexagonal Voronoi' },
  { id: 'warpspeed', label: 'Dobra Espacial / Warp Speed' },
]

function getAxisShader(pathname: string): ShaderKey {
  const path = pathname.toLowerCase()

  // Eixo 5: Gestão, Transparência & Ouvidoria
  if (
    path.startsWith('/transparencia') ||
    path.startsWith('/ouvidoria') ||
    path.startsWith('/documentos') ||
    path.startsWith('/sobre') ||
    path.startsWith('/chapa-semente') ||
    path.startsWith('/gestao')
  ) {
    return 'particleweb'
  }

  // Eixo 4: Carreira, Estágio & TCC
  if (
    path.startsWith('/carreira') ||
    path.startsWith('/estagio') ||
    path.startsWith('/tcc')
  ) {
    return 'flowfield'
  }

  // Eixo 3: Trajetória Curricular & 600h
  if (
    path.startsWith('/percurso') ||
    path.startsWith('/optativas') ||
    path.startsWith('/acg') ||
    path.startsWith('/cursos')
  ) {
    return 'topography'
  }

  // Eixo 2: Acolhimento & Vida Universitária
  if (
    path.startsWith('/curso') ||
    path.startsWith('/calouros') ||
    path.startsWith('/permanencia') ||
    path.startsWith('/pesquisa')
  ) {
    return 'lissajous'
  }

  // Eixo 1 / Home / Default
  return 'dotwave'
}

export const GlobalCanvasBackdrop: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/')
  const [selectedShader, setSelectedShader] = useState<ShaderKey>('auto')
  const [visitorMode, setVisitorMode] = useState<string>('operate')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateState = () => {
      setCurrentPath(window.location.pathname)
      setVisitorMode(document.documentElement.dataset.visitorMode || 'operate')
      try {
        const stored = getVaultItem('cagp_a11y_prefs_v2')
        if (stored?.shader) {
          setSelectedShader(stored.shader as ShaderKey)
        }
      } catch {
        // Fallback default
      }
    }
    updateState()

    const handleVaultSync = () => updateState()
    window.addEventListener('storage', handleVaultSync)
    window.addEventListener('cagp:vault-updated', handleVaultSync)
    document.addEventListener('astro:page-load', updateState)
    document.addEventListener('astro:after-swap', updateState)
    window.addEventListener('popstate', updateState)

    return () => {
      window.removeEventListener('storage', handleVaultSync)
      window.removeEventListener('cagp:vault-updated', handleVaultSync)
      document.removeEventListener('astro:page-load', updateState)
      document.removeEventListener('astro:after-swap', updateState)
      window.removeEventListener('popstate', updateState)
    }
  }, [])

  const activeShader = selectedShader === 'auto' ? getAxisShader(currentPath) : selectedShader

  // DESIGN.md › Volumes: canvas é decoração do volume Cartaz. Em Ficha/Papel o fundo é papel parado,
  // salvo escolha explícita do estudante nas configurações.
  const isCartaz = visitorMode === 'persuade' || visitorMode === 'experience'
  if (selectedShader === 'auto' && !isCartaz) return null

  const renderShader = () => {
    switch (activeShader) {
      case 'aurora':
        return <Aurora colors={['#5B2A85', '#FE8812', '#266264', '#9E2424']} speed={0.7} />
      case 'crt':
        return <CRT color="#5B2A85" scanGap={3} flicker={0.2} speed={0.8} />
      case 'dither':
        return <Dither />
      case 'dotblob':
        return <DotBlob />
      case 'flowfield':
        return <FlowField />
      case 'godrays':
        return <GodRays />
      case 'gravitywells':
        return <GravityWells />
      case 'halftone':
        return <Halftone />
      case 'lightning':
        return <Lightning />
      case 'lissajous':
        return <LissajousGrid />
      case 'matrixrain':
        return <MatrixRain />
      case 'meshgradient':
        return <MeshGradient />
      case 'metaballs':
        return <Metaballs />
      case 'mouseripple':
        return <MouseRipple />
      case 'particleweb':
        return <ParticleWeb particleColor="#5B2A85" lineColor="#FE8812" count={38} speed={0.8} />
      case 'plasma':
        return <Plasma />
      case 'pulsingborder':
        return <PulsingBorder />
      case 'swirl':
        return <Swirl />
      case 'topography':
        return <Topography lineColor="#5B2A85" speed={0.5} />
      case 'truchet':
        return <Truchet />
      case 'voronoipulse':
        return <VoronoiPulse cellCount={22} speed={0.7} />
      case 'warpspeed':
        return <WarpSpeed />
      case 'dotwave':
      default:
        return <DotWave />
    }
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-10 sm:opacity-15 transition-opacity duration-700 ease-in-out"
      aria-hidden="true"
    >
      {renderShader()}
    </div>
  )
}
