import React, { useState } from 'react';
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from '@/components/ui/message';
import { Bubble, type BubbleReaction } from '@/components/ui/bubble';
import { Marker } from '@/components/ui/marker';
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerJumpButton,
} from '@/components/ui/message-scroller';
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
} from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FaqItem } from './FaqInteractiveExplorer';

interface ChatMessage {
  id: string;
  from: 'user' | 'assistant';
  author: string;
  avatarText: string;
  time: string;
  text: string;
  badge?: string;
  reactions?: BubbleReaction[];
}

interface Props {
  faqs: FaqItem[];
}

export const FaqChatAssistant: React.FC<Props> = ({ faqs }) => {
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      from: 'assistant',
      author: 'Plantão CAGP',
      avatarText: 'GP',
      time: '18:00',
      text: 'Olá! Sou o assistente do Plantão Discente do CAGP. Tem alguma dúvida sobre trancamento, aproveitamento, estágio, TCC ou regulamento da UFMG?',
      reactions: [
        { emoji: '👋', count: 8, active: true },
        { emoji: '🏛️', count: 5, active: false },
      ],
    },
  ]);

  const handleSelectFaq = (faqId: string) => {
    const faq = faqs.find((f) => f.id === faqId);
    if (!faq) return;

    setComboboxOpen(false);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      from: 'user',
      author: 'Você',
      avatarText: 'VC',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: faq.q,
    };

    const assistantMsg: ChatMessage = {
      id: `asst-${Date.now() + 1}`,
      from: 'assistant',
      author: 'Plantão CAGP',
      avatarText: 'GP',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: faq.a,
      badge: faq.badge,
      reactions: [
        { emoji: '👍', count: 1, active: false },
        { emoji: '📌', count: 1, active: false },
      ],
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  const handleReactionClick = (msgId: string, reaction: BubbleReaction) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId || !msg.reactions) return msg;
        return {
          ...msg,
          reactions: msg.reactions.map((r) => {
            if (r.emoji === reaction.emoji) {
              const active = !r.active;
              return {
                ...r,
                active,
                count: active ? r.count + 1 : Math.max(0, r.count - 1),
              };
            }
            return r;
          }),
        };
      })
    );
  };

  return (
    <Card className="border-3 border-border shadow-md">
      <CardHeader className="p-4 sm:p-5 border-b-2 border-border bg-muted/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-base sm:text-lg font-heading font-black uppercase text-foreground">
              Plantão de Dúvidas Interativo
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5 m-0">
              Converse com a base regimental do Centro Acadêmico em formato de chat tátil.
            </p>
          </div>

          {/* Combobox de Seleção de Dúvida */}
          <div className="w-full sm:w-72">
            <Combobox open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <ComboboxTrigger
                open={comboboxOpen}
                placeholder="Pesquisar dúvida..."
                className="min-h-[44px] bg-white border-2 border-border rounded-xl text-xs font-head uppercase font-bold"
              />
              <ComboboxContent className="w-full sm:w-80 p-0 border-3 border-border shadow-lg">
                <ComboboxInput placeholder="Digite para filtrar dúvidas..." />
                <ComboboxList>
                  <ComboboxEmpty>Nenhuma pergunta encontrada.</ComboboxEmpty>
                  <ComboboxGroup heading="Perguntas Frequentes">
                    {faqs.map((f) => (
                      <ComboboxItem
                        key={f.id}
                        value={f.q}
                        onSelect={() => handleSelectFaq(f.id)}
                        className="text-xs cursor-pointer"
                      >
                        {f.q}
                      </ComboboxItem>
                    ))}
                  </ComboboxGroup>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4">
        {/* Scroller de Mensagens */}
        <MessageScroller className="h-80 border-2 border-border rounded-xl p-3 sm:p-4 bg-muted/10 relative">
          <MessageScrollerContent className="space-y-4">
            <Marker variant="separator" className="mb-4">
              <span>Atendimento CAGP • Hoje</span>
            </Marker>

            {messages.map((m) => (
              <Message
                key={m.id}
                from={m.from}
                data-message-id={m.id}
                className="mb-4"
              >
                <MessageAvatar className="w-8 h-8 rounded-lg bg-card border-2 border-border flex items-center justify-center font-mono font-bold text-xs text-foreground shadow-xs">
                  {m.avatarText}
                </MessageAvatar>
                <MessageContent>
                  <MessageHeader className="text-[11px] font-mono font-bold text-muted-foreground flex items-center gap-2">
                    <span>{m.author}</span>
                    <span>•</span>
                    <span>{m.time}</span>
                    {m.badge && (
                      <span className="px-1.5 py-0.2 rounded bg-primary text-white text-[10px] uppercase font-head font-bold">
                        {m.badge}
                      </span>
                    )}
                  </MessageHeader>
                  <Bubble
                    variant={m.from === 'user' ? 'primary' : 'default'}
                    align={m.from === 'user' ? 'end' : 'start'}
                    reactions={m.reactions}
                    onReactionClick={(r) => handleReactionClick(m.id, r)}
                    className="border-2 border-border p-3 text-xs leading-relaxed max-w-lg"
                  >
                    {m.text}
                  </Bubble>
                </MessageContent>
              </Message>
            ))}
          </MessageScrollerContent>
          <MessageScrollerJumpButton />
        </MessageScroller>

        {/* Dicas Rápidas de Perguntas em Pílulas */}
        <div>
          <span className="text-[11px] font-heading font-black uppercase text-muted-foreground block mb-2">
            Perguntas Frequentes Rápidas:
          </span>
          <div className="flex flex-wrap gap-2">
            {faqs.slice(0, 4).map((f) => (
              <Button
                key={f.id}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleSelectFaq(f.id)}
                className="text-xs"
              >
                {f.q.replace(/^\d+\.\s*/, '').slice(0, 38)}...
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
