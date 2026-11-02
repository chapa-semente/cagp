import { describe, it, expect } from 'vitest';
import { asset, route } from '../src/lib/paths';

describe('Paths Resolver (asset and route)', () => {
  it('resolve caminhos estaticos com e sem barra inicial', () => {
    const a1 = asset('/logos/cagp/emblema.svg');
    const a2 = asset('logos/cagp/emblema.svg');
    expect(a1).toContain('/logos/cagp/emblema.svg');
    expect(a2).toContain('/logos/cagp/emblema.svg');
    expect(a1).not.toContain('//');
    expect(a2).not.toContain('//');
  });

  it('resolve rotas internas corretamente', () => {
    const r1 = route('/');
    const r2 = route('/curso');
    expect(r1).toBe('/');
    expect(r2).toBe('/curso');
  });
});
