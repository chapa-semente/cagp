// Tipos do arquétipo "Guia de trâmite" (DESIGN.md › Arquétipos 2).

/** Ação dentro de um passo: o formulário, o modelo ou o link que o passo pede. */
export interface TramiteAcao {
  label?: string;
  href: string;
  /** pdf/docx baixam do repositório; gdoc/form/link abrem fora; anchor rola na própria página. */
  kind: 'pdf' | 'docx' | 'gdoc' | 'form' | 'link' | 'anchor';
  /** A ação principal do passo vira botão roxo (uma por passo). */
  primary?: boolean;
}

export interface TramitePasso {
  /** Verbo + objeto: "Combine o plano de atividades". */
  titulo: string;
  texto: string;
  /** Prazo ou regra curta em rótulo (ex.: "Antes do 1º dia"). */
  prazo?: string;
  acoes?: TramiteAcao[];
}

export interface TramiteModelo {
  titulo: string;
  desc: string;
  pdf?: string;
  docx?: string;
  gdoc?: string;
}
