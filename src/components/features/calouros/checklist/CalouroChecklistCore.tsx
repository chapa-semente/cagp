// src/components/features/calouros/checklist/CalouroChecklistCore.tsx — Checklist Interativo dos Primeiros 30 Dias (Padrão Dossiê Tátil)
import React, { useState, useEffect } from 'react';
import { getVaultItem, setVaultItem, type VaultData } from '../../../../lib/storage/studentVault';
import { asset } from '../../../../lib/paths';
import { CagpIcon, type CagpIconName } from '../../../ui/CagpIcon';

interface ChecklistItem {
  id: string;
  category: 'acesso' | 'documento' | 'espaco' | 'academico';
  title: string;
  desc: string;
  iconName: CagpIconName;
  link?: { label: string; url: string; ext?: boolean };
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk_minhaufmg',
    category: 'acesso',
    title: '1. Ativar MinhaUFMG e App SIGA UFMG',
    desc: 'Cadastre sua senha inicial no portal sistemas.ufmg.br utilizando a folha NIPs entregue no registro acadêmico do DRCA.',
    iconName: 'sliders',
    link: { label: 'Portal MinhaUFMG', url: 'https://sistemas.ufmg.br', ext: true },
  },
  {
    id: 'chk_eduroam',
    category: 'acesso',
    title: '2. Conectar à Rede Wi-Fi eduroam',
    desc: 'Conecte celular e computador à rede mundial acadêmica eduroam usando seu login institucional completo (seulogin@ufmg.br).',
    iconName: 'bolt',
    link: { label: 'Guia Wi-Fi DTI (PDF)', url: asset('/documentos/dti-office365-criacao-conta.pdf'), ext: false },
  },
  {
    id: 'chk_carteirinha',
    category: 'documento',
    title: '3. Emitir Carteirinha de Estudante da UFMG',
    desc: 'Necessária para acesso às catracas do RU II Setorial e empréstimo de livros na Biblioteca Baeta Neves (1º andar da FAFICH).',
    iconName: 'passport',
  },
  {
    id: 'chk_fump',
    category: 'documento',
    title: '4. Questionário Socioeconômico da FUMP',
    desc: 'Estudantes que demandam assistência devem preencher o cadastro para classificação nos níveis I a III para isenção e auxílios.',
    iconName: 'heart',
    link: { label: 'Área do Aluno FUMP', url: 'https://www.fump.ufmg.br/', ext: true },
  },
  {
    id: 'chk_secretaria',
    category: 'espaco',
    title: '5. Conhecer a Secretaria Sala F-2039',
    desc: 'Localize a secretaria do Colegiado no 2º andar da FAFICH para atendimento presencial com Norma Guedes às quartas-feiras (13h às 19h).',
    iconName: 'door-open',
  },
  {
    id: 'chk_ceag',
    category: 'espaco',
    title: '6. Conhecer o CEAG FAFICH (2º Andar)',
    desc: 'Central de Atendimento à Graduação no 2º andar (em frente aos caixas eletrônicos), aberta das 08h às 22h para atestados, trancamentos e requerimentos.',
    iconName: 'building',
  },
  {
    id: 'chk_ru',
    category: 'espaco',
    title: '7. Almoçar ou Jantar no RU II Setorial',
    desc: 'Restaurante Universitário atrás da FAFICH. Jantar das 17h10 às 19h30 (horário de ouro entre 18h00 e 18h25).',
    iconName: 'utensils',
  },
  {
    id: 'chk_matricula',
    category: 'academico',
    title: '8. Entender a Matrícula Automática do 1º Período',
    desc: 'No 1º semestre, sua matrícula é automática nas 5 obrigatórias (300h): DCP 124, DCP 032, SOA 048, DCP 123 e DCP 033.',
    iconName: 'curriculo',
  },
  {
    id: 'chk_cagp',
    category: 'academico',
    title: '9. Seguir o CAGP e Participar dos Grupos de Turma',
    desc: 'Participe dos canais de acolhimento discente e grupos oficiais para avisos sobre calendários e oportunidades.',
    iconName: 'users',
  },
  {
    id: 'chk_transporte',
    category: 'acesso',
    title: '10. Mapear as Linhas do Circular Interno',
    desc: 'Linhas gratuitas 1, 2, 3 e 4 para circulação no campus Pampulha. Última saída da FAFICH às 22h45.',
    iconName: 'bus',
  },
];

export const CalouroChecklistCore: React.FC = () => {
  const [checks, setChecks] = useState<VaultData<'cagp_calouro_checklist_v1'>>({});
  const [filter, setFilter] = useState<string>('todos');

  useEffect(() => {
    const raw = getVaultItem('cagp_calouro_checklist_v1') || {};
    setChecks(raw);
  }, []);

  const toggleCheck = (id: string) => {
    const next = { ...checks, [id]: !checks[id] };
    setChecks(next);
    setVaultItem('cagp_calouro_checklist_v1', next);
  };

  const completedCount = CHECKLIST_ITEMS.filter((item) => checks[item.id]).length;
  const pct = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  const filteredItems = CHECKLIST_ITEMS.filter((item) => {
    if (filter === 'todos') return true;
    return item.category === filter;
  });

  return (
    <div className="cagp-calouro-checklist space-y-6 select-none text-[#0A0A0A]">
      {/* Painel de Progresso */}
      <div className="p-5 sm:p-6 bg-white border border-[#DFDBD2] rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="text-[11px] font-['Oswald'] uppercase font-bold tracking-wider text-[#8B1E2D]">
            Acolhimento Discente • 1º Período
          </span>
          <h3 className="font-['Oswald'] text-base sm:text-lg font-bold uppercase text-[#0A0A0A] m-0">
            Checklist de Integração Acadêmica
          </h3>
          <p className="text-xs text-[#57534E] mt-0.5 m-0">
            Conclua os 10 passos nos primeiros 30 dias de aula para garantir plena regularidade.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="space-y-1 flex-1 sm:w-44">
            <div className="flex justify-between text-[11px] font-mono text-[#57534E]">
              <span>Conclusão</span>
              <span className="font-bold text-[#8B1E2D]">{completedCount} de 10 ({pct}%)</span>
            </div>
            <div className="w-full bg-[#FBF8F3] border border-[#DFDBD2] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#8B1E2D] h-full transition-all duration-300 rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          {completedCount === CHECKLIST_ITEMS.length && (
            <span className="cagp-stamp-badge is-homologado text-[11px] py-1 px-3 shadow-xs shrink-0">
              <span className="inline-flex items-center gap-1">
                <CagpIcon name="stamp" className="w-3.5 h-3.5 inline" />
                <span>INTEGRALIZADO</span>
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Filtros por Categoria */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'todos', label: 'Todos os Passos' },
          { id: 'acesso', label: 'Sistemas & Wi-Fi' },
          { id: 'documento', label: 'Carteirinha & FUMP' },
          { id: 'espaco', label: 'Espaços & RU II' },
          { id: 'academico', label: 'Grade & CAGP' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              filter === f.id
                ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-xs'
                : 'bg-white text-[#292524] border-[#DFDBD2] hover:bg-[#FBF8F3]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista de Passos do Checklist */}
      <div className="bg-white border border-[#DFDBD2] rounded-3xl divide-y divide-[#DFDBD2] shadow-xs overflow-hidden">
        {filteredItems.map((item) => {
          const isDone = !!checks[item.id];
          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                isDone ? 'bg-[#F0FDF4]/50' : 'hover:bg-[#FBF8F3]'
              }`}
            >
              <label
                htmlFor={`chk-${item.id}`}
                className="pt-0.5 cursor-pointer shrink-0"
              >
                <input
                  type="checkbox"
                  id={`chk-${item.id}`}
                  checked={isDone}
                  onChange={() => toggleCheck(item.id)}
                  className="w-5 h-5 text-[#15803D] accent-[#15803D] rounded border-gray-300 focus:ring-0 cursor-pointer"
                />
              </label>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4
                    className={`font-['Oswald'] text-xs sm:text-sm font-bold uppercase leading-tight m-0 ${
                      isDone ? 'line-through text-[#78716C]' : 'text-[#0A0A0A]'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 shrink-0">
                    {isDone && (
                      <span className="cagp-stamp-badge is-feito text-[10px] py-0.5 px-2.5 shadow-xs">
                        <span className="inline-flex items-center gap-1">
                          <CagpIcon name="check" className="w-3 h-3 inline" />
                          <span>FEITO</span>
                        </span>
                      </span>
                    )}
                    <span className={isDone ? 'text-[#15803D]' : 'text-[#A8A29E]'}>
                      <CagpIcon name={item.iconName} className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed m-0 mb-2">
                  {item.desc}
                </p>

                {item.link && (
                  <a
                    href={item.link.url}
                    target={item.link.ext ? '_blank' : undefined}
                    rel={item.link.ext ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B1E2D] hover:underline"
                  >
                    <span>{item.link.label}</span>
                    <CagpIcon name="arrow-up-right" className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner de Celebração */}
      {completedCount === CHECKLIST_ITEMS.length && completedCount > 0 && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#DCFCE7]/70 border border-[#15803D] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <span className="cagp-stamp-badge is-homologado">★ 100% CONCLUÍDO</span>
              <span className="font-['Oswald'] font-bold text-sm uppercase text-[#15803D]">
                Todos os 30 Dias Ativados!
              </span>
            </div>
            <p className="text-xs text-[#292524] m-0">
              Parabéns! Todos os sistemas, acessos e rotinas da UFMG foram integralmente configurados.
            </p>
          </div>
          <div className="cagp-big-stamp shrink-0 scale-90 sm:scale-100 shadow-xs">
            <span className="cagp-big-stamp-title">★ CALOURO INTEGRALIZADO</span>
            <span className="cagp-big-stamp-sub">FAFICH / UFMG</span>
          </div>
        </div>
      )}
    </div>
  );
};
