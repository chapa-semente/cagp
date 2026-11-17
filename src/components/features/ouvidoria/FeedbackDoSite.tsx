// src/components/features/ouvidoria/FeedbackDoSite.tsx — "Fala com a gente": críticas, erros e ideias sobre este site.
//
// Até 12/11/2026 esta página era só a demonstração da Proposta 14 (o "Fala com o CA"): um formulário em
// três etapas que guardava o rascunho no celular. Decisão do Gabriel em 12/11: enquanto a chapa não é
// gestão, o canal já serve de verdade para uma coisa, receber crítica, erro e sugestão sobre o próprio
// site, porque "aceitamos críticas como oportunidade de sermos melhores".
//
// O site não tem servidor: a mensagem sai pelo e-mail de quem escreve (mailto para o e-mail da Chapa
// Semente) ou é copiada para a pessoa mandar por onde quiser. Por isso o texto nunca diz "enviado":
// diz que o e-mail foi aberto com o texto pronto. O que a pessoa escreveu fica guardado só no aparelho.
import React, { useEffect, useId, useState } from 'react';
import { getVaultItem, setVaultItem, type VaultData } from '@/lib/storage/studentVault';
import { CHAPA_INSTAGRAM, CHAPA_INSTAGRAM_URL } from '@/lib/chapaSementeData';
import { toast } from '@/lib/toast';

const EMAIL_DA_CHAPA = 'chapa.semente.gp@gmail.com';

type Tipo = 'erro' | 'ideia' | 'critica';
const TIPOS: { id: Tipo; rotulo: string; icone: string; assunto: string; exemplo: string }[] = [
  { id: 'erro', rotulo: 'Achei um erro', icone: 'bi-exclamation-triangle', assunto: 'Erro no site', exemplo: 'Ex: o horário do RU está errado, o link do requerimento não abre.' },
  { id: 'ideia', rotulo: 'Tenho uma ideia', icone: 'bi-lightbulb', assunto: 'Ideia pro site', exemplo: 'Ex: faltou o guia de trancamento, queria avisar do prazo de matrícula.' },
  { id: 'critica', rotulo: 'Quero criticar', icone: 'bi-megaphone', assunto: 'Crítica ao site', exemplo: 'Ex: o tour é longo demais, não entendi a página de horas.' },
];

type Registro = VaultData<'cagp_ouvidoria_manifestacoes_v1'>[number];

/** O texto que sai do site: o mesmo no e-mail e no copiar. */
function montarTexto(tipo: Tipo, onde: string, mensagem: string, contato: string): string {
  const t = TIPOS.find((x) => x.id === tipo)!;
  const linhas = [`[${t.assunto}]`];
  if (onde.trim()) linhas.push(`Onde: ${onde.trim()}`);
  linhas.push('', mensagem.trim(), '', contato.trim() ? `Pode me responder em: ${contato.trim()}` : 'Não precisa responder.');
  return linhas.join('\n');
}

async function copiar(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // Navegador de dentro do WhatsApp e afins: sem área de transferência, vai pelo campo de texto.
    const el = document.createElement('textarea');
    el.value = texto;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    el.remove();
    return ok;
  }
}

const campo =
  'block w-full rounded-[12px] border-3 border-border bg-white px-3 py-2.5 text-base text-foreground placeholder:text-content-secondary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary';
const rotulo = 'block font-heading text-base font-bold text-foreground';
const botao =
  'inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-[12px] border-3 border-border px-4 font-heading text-sm font-bold uppercase tracking-[0.03em] shadow-md transition-[translate,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50';

export const FeedbackDoSite: React.FC = () => {
  const id = useId();
  const [tipo, setTipo] = useState<Tipo>('erro');
  const [onde, setOnde] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [contato, setContato] = useState('');
  const [guardados, setGuardados] = useState<Registro[]>([]);
  const [saiu, setSaiu] = useState<'email' | 'copia' | null>(null);

  useEffect(() => {
    setGuardados(getVaultItem('cagp_ouvidoria_manifestacoes_v1'));
    // Quem chega pelo rodapé de outra página já vem com o "onde" preenchido (?de=/estagio).
    const de = new URLSearchParams(window.location.search).get('de');
    if (de && /^\/[\w\-/]*$/.test(de) && de !== '/ouvidoria') setOnde(`Página ${de}`);
  }, []);

  const atual = TIPOS.find((t) => t.id === tipo)!;
  const pronto = mensagem.trim().length >= 10;
  const texto = montarTexto(tipo, onde, mensagem, contato);

  const guardar = () => {
    const agora = new Date();
    const novo: Registro = {
      id: `fb-${agora.getTime()}`,
      protocol: `SITE-${agora.getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      category: tipo,
      subject: onde.trim() || atual.assunto,
      message: mensagem.trim(),
      isAnonymous: !contato.trim(),
      status: 'registrada',
      createdAt: agora.toISOString(),
    };
    const lista = [novo, ...guardados].slice(0, 30);
    setGuardados(lista);
    setVaultItem('cagp_ouvidoria_manifestacoes_v1', lista);
  };

  const mandarPorEmail = () => {
    if (!pronto) return;
    guardar();
    setSaiu('email');
    window.location.href = `mailto:${EMAIL_DA_CHAPA}?subject=${encodeURIComponent(`[Site da Semente] ${atual.assunto}`)}&body=${encodeURIComponent(texto)}`;
  };

  const copiarTexto = async () => {
    if (!pronto) return;
    const ok = await copiar(texto);
    if (!ok) {
      toast.error('O navegador bloqueou a cópia. Selecione o texto e copie à mão.');
      return;
    }
    guardar();
    setSaiu('copia');
    toast.success('Texto copiado. Agora é só colar e mandar.');
  };

  const recomecar = () => {
    setMensagem('');
    setSaiu(null);
  };

  return (
    <div className="grid gap-8">
      <form
        className="grid gap-5 rounded-[16px] border-3 border-border bg-white p-4 shadow-md sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          mandarPorEmail();
        }}
      >
        <fieldset className="m-0 grid gap-2 border-0 p-0">
          <legend className={`${rotulo} mb-2 p-0`}>O que você quer contar?</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {TIPOS.map((t) => (
              <label
                key={t.id}
                className="flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-[12px] border-3 border-border bg-white px-3 py-2 font-heading text-base font-bold text-foreground shadow-sm transition-[translate,box-shadow,background-color] duration-150 has-[:checked]:translate-x-0.5 has-[:checked]:translate-y-0.5 has-[:checked]:bg-primary has-[:checked]:text-white has-[:checked]:shadow-none has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary"
              >
                <input type="radio" name={`${id}-tipo`} value={t.id} checked={tipo === t.id} onChange={() => setTipo(t.id)} className="sr-only" />
                <i className={`bi ${t.icone} text-lg`} aria-hidden="true" />
                {t.rotulo}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-2">
          <label htmlFor={`${id}-msg`} className={rotulo}>
            Conta pra gente
          </label>
          <textarea
            id={`${id}-msg`}
            value={mensagem}
            onChange={(e) => {
              setMensagem(e.target.value);
              setSaiu(null);
            }}
            rows={5}
            required
            minLength={10}
            placeholder={atual.exemplo}
            aria-describedby={`${id}-msg-ajuda`}
            className={`${campo} min-h-[8.5rem] resize-y leading-relaxed`}
          />
          <p id={`${id}-msg-ajuda`} className="m-0 text-sm text-content-secondary">
            Pode ser direto e pode pegar pesado: crítica é o que faz o site melhorar.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor={`${id}-onde`} className={rotulo}>
              Em que página? <span className="font-sans text-sm font-normal text-content-secondary">(se souber)</span>
            </label>
            <input id={`${id}-onde`} type="text" value={onde} onChange={(e) => setOnde(e.target.value)} placeholder="Ex: calculadora das 600h" className={campo} />
          </div>
          <div className="grid gap-2">
            <label htmlFor={`${id}-contato`} className={rotulo}>
              Quer resposta? <span className="font-sans text-sm font-normal text-content-secondary">(opcional)</span>
            </label>
            <input
              id={`${id}-contato`}
              type="text"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              autoComplete="off"
              placeholder="Seu nome, e-mail ou @"
              className={campo}
            />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={!pronto} className={`${botao} bg-accent text-foreground`}>
              <i className="bi bi-envelope" aria-hidden="true" />
              Mandar por e-mail
            </button>
            <button type="button" onClick={copiarTexto} disabled={!pronto} className={`${botao} bg-white text-foreground`}>
              <i className="bi bi-clipboard" aria-hidden="true" />
              Copiar o texto
            </button>
          </div>
          <p className="m-0 max-w-[62ch] text-sm leading-relaxed text-content-secondary" role="status" aria-live="polite">
            {saiu === 'email' ? (
              <>
                <strong className="text-foreground">Seu e-mail abriu com o texto pronto.</strong> Falta só tocar em enviar por lá. Se não abriu nada, use
                “Copiar o texto”.
              </>
            ) : saiu === 'copia' ? (
              <>
                <strong className="text-foreground">Texto copiado.</strong> Cole numa mensagem pro Instagram da chapa,{' '}
                <a href={CHAPA_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline underline-offset-[0.22em]">
                  {CHAPA_INSTAGRAM}
                </a>
                , ou pro e-mail {EMAIL_DA_CHAPA}.
              </>
            ) : (
              <>
                O site não tem servidor: a mensagem sai pelo seu e-mail e chega em <strong className="text-foreground">{EMAIL_DA_CHAPA}</strong>, o
                e-mail da Chapa Semente. Quem lê é a equipe que fez o site.
              </>
            )}
          </p>
          {saiu && (
            <button type="button" onClick={recomecar} className="inline-flex min-h-[44px] w-fit cursor-pointer items-center gap-2 text-sm font-bold text-primary underline underline-offset-[0.22em]">
              <i className="bi bi-plus-lg" aria-hidden="true" />
              Escrever outra
            </button>
          )}
        </div>
      </form>

      {guardados.length > 0 && (
        <section aria-labelledby={`${id}-guardados`} className="grid gap-3">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-border pb-2">
            <h2 id={`${id}-guardados`} className="m-0 font-heading text-xl font-bold text-foreground">
              O que você já escreveu
            </h2>
            <button
              type="button"
              onClick={() => {
                setGuardados([]);
                setVaultItem('cagp_ouvidoria_manifestacoes_v1', []);
              }}
              className="inline-flex min-h-[44px] cursor-pointer items-center text-sm font-bold text-primary underline underline-offset-[0.22em]"
            >
              Apagar deste celular
            </button>
          </div>
          <ul className="m-0 grid list-none gap-0 p-0">
            {guardados.map((g) => (
              <li key={g.id} className="grid gap-1 border-b-2 border-border py-3 last:border-b-0">
                <p className="m-0 text-sm font-bold text-content-secondary">
                  {TIPOS.find((t) => t.id === g.category)?.rotulo ?? 'Rascunho antigo'} · {new Date(g.createdAt).toLocaleDateString('pt-BR')} · {g.subject}
                </p>
                <p className="m-0 whitespace-pre-line text-base leading-relaxed text-foreground">{g.message}</p>
              </li>
            ))}
          </ul>
          <p className="m-0 text-sm text-content-secondary">Esta lista fica só no seu aparelho. A chapa só recebe o que você mandou por e-mail ou colou numa mensagem.</p>
        </section>
      )}
    </div>
  );
};

export default FeedbackDoSite;
