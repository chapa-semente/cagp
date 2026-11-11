import React, { useState, useEffect } from 'react'
import { DotWave, Topography } from '@/components/boldkit/canvas-effects'

export type ShaderKey = 'topography' | 'dotwave'

export const GlobalCanvasBackdrop: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/')
  const [visitorMode, setVisitorMode] = useState<string>('operate')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateState = () => {
      setCurrentPath(window.location.pathname)
      setVisitorMode(document.documentElement.dataset.visitorMode || 'operate')
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

  // DESIGN.md › Movimento › Canvas: o fundo animado é decoração do volume Cartaz e é escolhido pelo
  // site, nunca pelo estudante. Só os efeitos que falam a geometria da marca: topografia e pontos.
  // Em Ficha e Papel o fundo é areia parada.
  const isCartaz = visitorMode === 'persuade' || visitorMode === 'experience'
  if (!isCartaz) return null
  const activeShader: ShaderKey = currentPath.replace(/\/+$/, '').endsWith('/chapa-semente') ? 'topography' : 'dotwave'

  const renderShader = () =>
    activeShader === 'topography' ? <Topography lineColor="#5B2A85" speed={0.5} /> : <DotWave />

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-10 sm:opacity-15 transition-opacity duration-700 ease-in-out"
      aria-hidden="true"
    >
      {renderShader()}
    </div>
  )
}
