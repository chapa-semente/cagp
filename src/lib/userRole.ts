// src/lib/userRole.ts — As quatro fases do curso e seus rótulos.
// Fica fora de studentVault.ts de propósito: a moldura do site (trilho lateral, em JS puro) precisa
// só destes textos, e importar o cofre traria junto a biblioteca de validação (zod) em toda página.
export type UserRole = 'calouro' | 'veterano' | 'formando' | 'ingressar';

export const USER_ROLES: readonly UserRole[] = ['calouro', 'veterano', 'formando', 'ingressar'];

export const USER_ROLE_META: Record<
  UserRole,
  { label: string; shortLabel: string; badge: string; tagline: string; periodHint: string }
> = {
  calouro: {
    label: 'Sou Calouro(a)',
    shortLabel: 'Calouro',
    badge: '1º–2º Período',
    tagline: 'Acolhimento, checklist dos primeiros 30 dias e rotina noturna na FAFICH.',
    periodHint: 'Primeiros 30 dias • Acolhimento',
  },
  veterano: {
    label: 'Sou Veterano(a)',
    shortLabel: 'Veterano',
    badge: '3º–7º Período',
    tagline: 'Prazos de 120 dias (AAC), calculadora de 600h, percursos e catálogo de optativas.',
    periodHint: 'Meio de Curso • 600h & Optativas',
  },
  formando: {
    label: 'Sou Formando(a)',
    shortLabel: 'Formando',
    badge: '8º–10º Período',
    tagline: 'Integralização das 600h, dispensa de estágio (Art. 41), modalidades de TCC e colação.',
    periodHint: 'Reta Final • Estágio & TCC',
  },
  ingressar: {
    label: 'Quero Ingressar',
    shortLabel: 'Ingressar',
    badge: 'Futuro Discente',
    tagline: 'Conheça a carreira em Gestão Pública na UFMG, formas de ingresso (SiSU/Reopção) e a vida acadêmica.',
    periodHint: 'SiSU, Reopção & Carreira Pública',
  },
};
