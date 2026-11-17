import React from 'react'
import { motion } from 'motion/react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, PlusCircle, Trash2 } from '@/components/ui/icons'
import { tactileSpring, bounceSpring } from '@/lib/motion'

export interface CourseDetailNode {
  code: string
  name: string
  period: number
  ch: number
  desc: string
  dept: string
  isCustom?: boolean
  category?: string
  isFormalLock?: boolean
  isKey?: boolean
  formalReqs?: string[]
  suggestedReqs?: string[]
  formalUnlocks?: string[]
  suggestedUnlocks?: string[]
  trackLabel?: string
}

interface CourseDetailDrawerProps {
  node: CourseDetailNode | null
  isOpen: boolean
  isCompleted: boolean
  onClose: () => void
  onToggleCompleted: (code: string, ch: number) => void
  onDeleteCustom?: (code: string) => void
}

export const CourseDetailDrawer: React.FC<CourseDetailDrawerProps> = ({
  node,
  isOpen,
  isCompleted,
  onClose,
  onToggleCompleted,
  onDeleteCustom,
}) => {
  if (!node) return null

  const handleToggle = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(15)
    }
    onToggleCompleted(node.code, node.ch)
  }

  const handleDelete = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([20, 40, 20])
    }
    onDeleteCustom?.(node.code)
    onClose()
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh] p-0 font-sans border-3 border-b-0 border-border bg-card text-foreground">
        <DrawerHeader className="border-b-3 border-border p-4 sm:p-6 text-left bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="font-mono text-xs">
                {node.code}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {node.dept}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {node.period}º Período • {node.ch}h
              </Badge>
              {node.isFormalLock && (
                <Badge variant="destructive" className="text-xs font-bold">
                  Trava SIGA
                </Badge>
              )}
              {node.isCustom && (
                <Badge variant="accent" className="text-xs">
                  Formação Livre
                </Badge>
              )}
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-tint border-2 border-border text-xs font-heading font-black uppercase text-foreground shadow-sm">
              Mapa Chapa Semente
            </span>
          </div>
          <DrawerTitle className="font-heading text-lg sm:text-xl font-extrabold uppercase leading-snug tracking-tight text-foreground">
            {node.name}
          </DrawerTitle>
          {node.trackLabel && (
            <DrawerDescription className="text-xs font-mono font-bold text-muted-foreground mt-1">
              Trilha: {node.trackLabel}
            </DrawerDescription>
          )}
        </DrawerHeader>

        <motion.div
          key={node.code}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tactileSpring}
          className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[50vh] text-sm"
        >
          {/* Ementa */}
          <div>
            <h4 className="font-heading text-xs font-extrabold text-muted-foreground mb-1">
              Ementa Oficial & Conteúdo Programático
            </h4>
            <p className="text-foreground leading-relaxed bg-white p-3.5 rounded-xl border-2 border-border text-xs sm:text-sm shadow-md">
              {node.desc || 'Ementa cadastrada em conformidade com o Projeto Pedagógico do Curso (PPC 2020).'}
            </p>
          </div>

          {/* Pré-requisitos Formais e Sugeridos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={bounceSpring}
              className="p-3 rounded-xl border-2 border-border bg-white space-y-1 shadow-md"
            >
              <span className="text-xs font-heading font-extrabold uppercase text-secondary block">
                ⬅ Pré-Requisitos Formais (SIGA)
              </span>
              {node.formalReqs && node.formalReqs.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {node.formalReqs.map((req) => (
                    <span
                      key={req}
                      className="px-2 py-0.5 rounded-md bg-destructive-tint border-2 border-border text-secondary font-mono text-xs font-bold shadow-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Sem pré-requisito formal cadastrado.</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={bounceSpring}
              className="p-3 rounded-xl border-2 border-border bg-white space-y-1 shadow-md"
            >
              <span className="text-xs font-heading font-extrabold uppercase text-primary block">
                Libera no Fluxo Curricular →
              </span>
              {node.formalUnlocks && node.formalUnlocks.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {node.formalUnlocks.map((unl) => (
                    <span
                      key={unl}
                      className="px-2 py-0.5 rounded-md bg-primary-tint border-2 border-border text-primary font-mono text-xs font-bold shadow-sm"
                    >
                      {unl}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Não bloqueia formalmente outras disciplinas.</p>
              )}
            </motion.div>
          </div>
        </motion.div>

        <DrawerFooter className="border-t-2 border-border p-4 sm:p-6 bg-card flex flex-col sm:flex-row gap-2.5">
          <Button
            type="button"
            variant={isCompleted ? 'secondary' : 'default'}
            size="lg"
            onClick={handleToggle}
            className="flex-1 min-h-[46px] font-heading font-extrabold uppercase text-xs sm:text-sm"
          >
            {isCompleted ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
            <span>{isCompleted ? 'Concluída (Clique para Desmarcar)' : 'Marcar como Concluída (+)'}</span>
          </Button>

          {node.isCustom && onDeleteCustom && (
            <Button
              type="button"
              variant="destructive"
              size="lg"
              onClick={handleDelete}
              className="min-h-[46px] font-heading font-extrabold uppercase text-xs"
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              <span>Excluir do Grafo</span>
            </Button>
          )}

          <DrawerClose asChild>
            <Button variant="outline" size="lg" className="min-h-[46px]">
              Fechar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
