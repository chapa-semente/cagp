import React from 'react'
import { DotWave } from '@/components/boldkit/canvas-effects/DotWave'

export const GlobalCanvasBackdrop: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.045]"
      aria-hidden="true"
    >
      <DotWave color="#5B2A86" gap={32} speed={0.5} />
    </div>
  )
}
