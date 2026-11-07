import * as React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function SettingsBlock({ className }: { className?: string }) {
  return (
    <div className={cn("max-w-3xl mx-auto py-8 px-4", className)}>
      <h2 className="text-3xl font-black font-mono mb-6">Configurações</h2>
      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="border-2 border-black p-1 bg-neutral-100">
          <TabsTrigger value="geral" className="font-bold font-mono">Geral</TabsTrigger>
          <TabsTrigger value="notificacoes" className="font-bold font-mono">Notificações</TabsTrigger>
        </TabsList>
        <TabsContent value="geral" className="mt-4">
          <Card className="border-3 border-black shadow-sm p-6 space-y-4 bg-white">
            <CardTitle className="text-lg font-bold font-mono">Preferências do Sistema</CardTitle>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="font-bold">Modo Alto Contraste</Label>
              <Switch id="dark-mode" />
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="notificacoes" className="mt-4">
          <Card className="border-3 border-black shadow-sm p-6 space-y-4 bg-white">
            <CardTitle className="text-lg font-bold font-mono">Avisos e Lembretes</CardTitle>
            <div className="flex items-center justify-between">
              <Label htmlFor="reminders" className="font-bold">Alertas de Prazos DRCA</Label>
              <Switch id="reminders" defaultChecked />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
