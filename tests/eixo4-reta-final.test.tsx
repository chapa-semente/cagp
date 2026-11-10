import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { Art41SimulatorCore } from '@/components/features/estagio/art41/Art41SimulatorCore';
import { FormandoRetaFinalHub } from '@/components/features/carreira/FormandoRetaFinalHub';
import { getVaultItem, setVaultItem } from '@/lib/storage/studentVault';

describe('Eixo 4 — Reta Final, Estágio (Art. 41), TCC & Carreira', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza o Simulador Art. 41 com microcopy canônico "Aproveitamento Servidor" e downloads diretos', () => {
    render(<Art41SimulatorCore />);

    expect(screen.getAllByText(/Aproveitamento Servidor/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Requerimento de Aproveitamento \(Art\. 41\)/i)).toBeDefined();
    expect(screen.getByText(/Relatório de Atividades Profissionais/i)).toBeDefined();
  });

  it('exibe carimbo Verde Petróleo (#134E4A) de Dispensa Deferível quando todos os 5 requisitos do Art. 41 são cumpridos', () => {
    setVaultItem('cagp_art41_checklist_v1', {
      crit_vinculo: true,
      crit_matricula: true,
      crit_fase1: true,
      crit_horas: true,
      crit_fase2: true,
    });

    render(<Art41SimulatorCore />);
    expect(screen.getByText(/DISPENSA DEFERÍVEL \(300h\)/i)).toBeDefined();
  });

  it('renderiza o Hub Integrador Reta Final (Formando) e persiste checklist no studentVault', () => {
    render(<FormandoRetaFinalHub />);

    expect(
      screen.getByText(/Checklist Reta Final & Painel Integrado de Colação de Grau/i)
    ).toBeDefined();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(10);

    fireEvent.click(checkboxes[0]);
    const saved = getVaultItem('cagp_reta_final_checklist_v1');
    expect(saved.rf_estagio_plano).toBe(true);
  });

});
