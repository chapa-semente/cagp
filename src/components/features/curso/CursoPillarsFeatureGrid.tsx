import React from 'react'
import { FeatureGridWithIcons, type FeatureItem } from '@/components/boldkit/blocks/feature-grid'
import { Landmark, Scale, BarChart3, Building2, Compass, Network } from 'lucide-react'

const PILLARS: FeatureItem[] = [
  {
    icon: <Landmark className="h-5 w-5 text-white" />,
    title: 'Ciência Política & Estado',
    description: 'Sediado no DCP/UFMG (Conceito 7 CAPES), com forte embasamento em teoria democrática e arranjos institucionais.',
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-white" />,
    title: 'Economia & Finanças Públicas',
    description: 'Disciplinas em parceria com a FACE/UFMG sobre orçamento, tributação, responsabilidade fiscal e previdência.',
  },
  {
    icon: <Scale className="h-5 w-5 text-white" />,
    title: 'Direito Administrativo',
    description: 'Controle de legalidade, licitações públicas (Lei 14.133), contratos administrativos e probidade republicana.',
  },
  {
    icon: <Compass className="h-5 w-5 text-white" />,
    title: 'Métodos & Avaliação',
    description: 'Estatística aplicada, análise quantitativa de dados e avaliação ex-ante e ex-post de políticas públicas.',
  },
  {
    icon: <Building2 className="h-5 w-5 text-white" />,
    title: 'Estudos Urbanos & Regionais',
    description: 'Formação em planejamento metropolitano, gestão habitacional e sustentabilidade ambiental no Cedeplar/IGC.',
  },
  {
    icon: <Network className="h-5 w-5 text-white" />,
    title: 'Prática & Extensão',
    description: '300h de extensão obrigatória nos laboratórios DCP 195/196 com atendimento direto a prefeituras e órgãos estaduais.',
  },
]

export function CursoPillarsFeatureGrid() {
  return (
    <FeatureGridWithIcons
      title="Pilares Curriculares da Formação"
      description="Conheça as seis dimensões integradas do currículo de Gestão Pública na UFMG (PPC 2020)."
      features={PILLARS}
      columns={3}
      className="py-6 px-0"
    />
  )
}
