// src/lib/fotoDoPerfil.ts — Uma foto só para o site inteiro (decisão de 12/11/2026).
//
// A foto que a pessoa escolhe no tour ou na moldura de apoio é a mesma de Seu perfil: fica no
// cabeçalho, na carteirinha e volta para a moldura numa próxima visita. Tudo no aparelho
// (cagp_student_profile_v1.photoDataUrl), nada vai para servidor.
import { getVaultItem, setVaultItem } from '@/lib/storage/studentVault';

/** Lado do recorte guardado. JPEG para caber no armazenamento em qualquer navegador (~40 KB). */
const LADO = 512;

/** A foto guardada em Seu perfil, se houver. */
export function lerFotoDoPerfil(): string | null {
  const url = getVaultItem('cagp_student_profile_v1').photoDataUrl;
  return url && url.startsWith('data:image/') ? url : null;
}

/** O perfil foi criado só para guardar a foto: ingresso e percurso ainda são os valores padrão. */
function perfilAindaNaoPreenchido(): boolean {
  try {
    return !localStorage.getItem('cagp_student_profile_v1');
  } catch {
    return false;
  }
}

/**
 * Guarda um recorte quadrado (centro) da imagem como foto de Seu perfil.
 * `substituir: false` preserva a foto que a pessoa já tinha escolhido.
 */
export function guardarFotoNoPerfil(imagem: HTMLImageElement | HTMLCanvasElement, substituir = true): string | null {
  if (!substituir && lerFotoDoPerfil()) return null;
  const w = imagem instanceof HTMLImageElement ? imagem.naturalWidth : imagem.width;
  const h = imagem instanceof HTMLImageElement ? imagem.naturalHeight : imagem.height;
  if (!w || !h) return null;
  const canvas = document.createElement('canvas');
  canvas.width = LADO;
  canvas.height = LADO;
  const c = canvas.getContext('2d');
  if (!c) return null;
  const lado = Math.min(w, h);
  c.drawImage(imagem, (w - lado) / 2, (h - lado) / 2, lado, lado, 0, 0, LADO, LADO);
  const url = canvas.toDataURL('image/jpeg', 0.85);
  const rascunho = perfilAindaNaoPreenchido();
  const perfil = getVaultItem('cagp_student_profile_v1');
  setVaultItem('cagp_student_profile_v1', { ...perfil, photoDataUrl: url, rascunho: rascunho || perfil.rascunho });
  return url;
}

/** Nome escrito no tour: entra em Seu perfil sem mexer no resto. */
export function guardarNomeNoPerfil(nome: string): void {
  const limpo = nome.trim().slice(0, 60);
  if (!limpo) return;
  const rascunho = perfilAindaNaoPreenchido();
  const perfil = getVaultItem('cagp_student_profile_v1');
  setVaultItem('cagp_student_profile_v1', { ...perfil, name: limpo, rascunho: rascunho || perfil.rascunho });
}
