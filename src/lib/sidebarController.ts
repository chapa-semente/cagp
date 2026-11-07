// src/lib/sidebarController.ts — Controlador Cliente da Sidebar Responsiva Unificada (Proposta A)
import { getCagpIconSvg, resolveCagpIconName } from './cagpIcons';

export function initAppShellSidebar(): void {
  const sidebar = document.getElementById('cagp-app-sidebar');
  const backdrop = document.getElementById('cagp-sidebar-backdrop');
  if (!sidebar) return;

  const ROLE_LABELS: Record<string, string> = {
    calouro: 'Calouro',
    veterano: 'Veterano',
    formando: 'Formando',
    ingressar: 'Ingressar',
  };

  function isMobile(): boolean {
    return window.innerWidth < 768;
  }

  function isTablet(): boolean {
    return window.innerWidth >= 768 && window.innerWidth < 1280;
  }

  function openMobileDrawer(): void {
    sidebar?.classList.add('is-mobile-open');
    if (backdrop) {
      backdrop.classList.remove('hidden', 'pointer-events-none', 'opacity-0');
      backdrop.classList.add('opacity-100', 'pointer-events-auto');
    }
    document.body.style.overflow = 'hidden';
    document.body.classList.add('cagp-drawer-open');
  }

  function closeMobileDrawer(): void {
    sidebar?.classList.remove('is-mobile-open');
    if (backdrop) {
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      setTimeout(() => {
        if (!sidebar?.classList.contains('is-mobile-open') && !sidebar?.classList.contains('is-expanded')) {
          backdrop.classList.add('hidden');
        }
      }, 220);
    }
    document.body.style.overflow = '';
    document.body.classList.remove('cagp-drawer-open');
  }

  function expandSidebar(): void {
    sidebar?.classList.add('is-expanded');
    const spacer = document.getElementById('cagp-sidebar-tablet-spacer');
    if (spacer) spacer.style.display = 'block';
    if (backdrop) {
      backdrop.classList.remove('hidden', 'pointer-events-none', 'opacity-0');
      backdrop.classList.add('opacity-100', 'pointer-events-auto');
    }
  }

  function collapseSidebar(): void {
    sidebar?.classList.remove('is-expanded');
    const spacer = document.getElementById('cagp-sidebar-tablet-spacer');
    if (spacer) spacer.style.display = 'none';
    if (backdrop) {
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      setTimeout(() => {
        if (!sidebar?.classList.contains('is-mobile-open') && !sidebar?.classList.contains('is-expanded')) {
          backdrop.classList.add('hidden');
        }
      }, 200);
    }
  }

  function closeAnyNav(): void {
    closeMobileDrawer();
    collapseSidebar();
  }

  function toggleNav(): void {
    if (isMobile()) {
      if (sidebar?.classList.contains('is-mobile-open')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    } else if (isTablet()) {
      if (sidebar?.classList.contains('is-expanded')) {
        collapseSidebar();
      } else {
        expandSidebar();
      }
    }
  }

  // Exporta API síncrona global no window para compatibilidade com headers e botões
  (window as any).__cagp_open_drawer = () => {
    if (isMobile()) openMobileDrawer();
    else if (isTablet()) expandSidebar();
  };
  (window as any).__cagp_close_drawer = closeAnyNav;
  (window as any).__cagp_toggle_drawer = toggleNav;

  function syncSidebarProfile(): void {
    const nameEl = document.getElementById('cagp-sidebar-student-name');
    const metaEl = document.getElementById('cagp-sidebar-student-meta');
    const avatarEl = document.getElementById('cagp-sidebar-avatar');

    try {
      const rawProfile = localStorage.getItem('cagp_student_profile_v1');
      const rawRole = localStorage.getItem('cagp_user_role_v1');
      const profile = rawProfile ? JSON.parse(rawProfile) : null;
      const role = rawRole ? JSON.parse(rawRole) : 'calouro';
      const roleLabel = ROLE_LABELS[role] || 'Calouro';

      if (role === 'ingressar') {
        if (nameEl) nameEl.textContent = 'Futuro(a) Estudante';
        if (metaEl) metaEl.textContent = 'Perfil: Quero Ingressar';
        if (avatarEl) avatarEl.innerHTML = '<span>UF</span>';
        return;
      }

      if (profile && profile.name) {
        if (nameEl) nameEl.textContent = profile.name;
        if (metaEl) metaEl.textContent = `${profile.period || '1º Período'} • ${roleLabel}`;
        if (avatarEl) {
          if (profile.photoDataUrl) {
            avatarEl.innerHTML = `<img src="${profile.photoDataUrl}" alt="" class="w-full h-full object-cover" />`;
          } else {
            const initials = String(profile.name)
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((w: string) => w[0].toUpperCase())
              .join('');
            avatarEl.textContent = initials || 'GP';
          }
        }
      }
    } catch {}
  }

  function syncSidebarShortcuts(): void {
    const listEl = document.getElementById('cagp-sidebar-shortcuts-list');
    const railEl = document.getElementById('cagp-sidebar-shortcuts-rail');
    if (!sidebar) return;

    try {
      const catalogRaw = sidebar.getAttribute('data-shortcuts-catalog');
      const defaultsRaw = sidebar.getAttribute('data-shortcuts-defaults');
      const catalog = catalogRaw ? JSON.parse(catalogRaw) : [];
      const defaults: string[] = defaultsRaw ? JSON.parse(defaultsRaw) : [];

      const savedRaw = localStorage.getItem('cagp_discente_shortcuts_v1');
      const savedIds: string[] = savedRaw ? JSON.parse(savedRaw) : defaults;
      const idsToRender = (savedIds.length ? savedIds : defaults)
        .filter((id) => id !== 'menu')
        .slice(0, 4);

      // 1. Renderiza a lista completa para Desktop xl, Tablet Expandido e Mobile
      if (listEl) {
        listEl.innerHTML = idsToRender
          .map((id) => {
            const item = catalog.find((s: any) => s.id === id) || catalog[0];
            if (!item) return '';
            const svg = getCagpIconSvg(resolveCagpIconName(item.icon), 'w-4 h-4 shrink-0');
            const actionAttr =
              item.isAction && item.actionEvent ? `data-action="${item.actionEvent}"` : '';
            return `
              <a
                href="${item.href}"
                data-sidebar-shortcut="${item.id}"
                ${actionAttr}
                class="flex items-center justify-between gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-[#44403C] hover:bg-[#FBF8F3] hover:text-[#8B1E2D] no-underline transition-colors min-h-[38px]"
              >
                <span class="flex items-center gap-2 min-w-0 truncate">
                  <span class="text-[#8B1E2D]">${svg}</span>
                  <span class="truncate font-medium">${item.label}</span>
                </span>
                <span class="text-[11px] font-mono text-[#78716C]">${item.category}</span>
              </a>
            `;
          })
          .join('');
      }

      // 2. Renderiza os ícones táteis diretos para o Modo Rail Tablet
      if (railEl) {
        railEl.innerHTML = `
          ${idsToRender
            .map((id) => {
              const item = catalog.find((s: any) => s.id === id) || catalog[0];
              if (!item) return '';
              const svg = getCagpIconSvg(resolveCagpIconName(item.icon), 'w-5 h-5 shrink-0');
              const actionAttr =
                item.isAction && item.actionEvent ? `data-action="${item.actionEvent}"` : '';
              return `
                <a
                  href="${item.href}"
                  data-sidebar-shortcut="${item.id}"
                  ${actionAttr}
                  class="w-11 h-11 rounded-xl bg-[#FBF8F3] hover:bg-[#F4F1EA] text-[#292524] hover:text-[#8B1E2D] border border-[#DFDBD2] flex items-center justify-center transition-all cursor-pointer no-underline group active:scale-95 shrink-0"
                  title="${item.fullLabel} (${item.category}) — Toque para abrir"
                  aria-label="${item.label}"
                >
                  <span class="text-[#8B1E2D] group-hover:scale-110 transition-transform">${svg}</span>
                </a>
              `;
            })
            .join('')}
          <button
            type="button"
            id="cagp-rail-edit-shortcuts-btn"
            class="w-8 h-8 rounded-lg text-[#57534E] hover:text-[#8B1E2D] hover:bg-[#FBF8F3] border border-dashed border-[#DFDBD2] flex items-center justify-center transition-colors cursor-pointer mt-1"
            title="Personalizar Meus Atalhos"
            aria-label="Personalizar Meus Atalhos"
          >
            <span class="text-xs font-bold leading-none">+</span>
          </button>
        `;

        document.getElementById('cagp-rail-edit-shortcuts-btn')?.addEventListener('click', () => {
          closeAnyNav();
          window.dispatchEvent(new CustomEvent('cagp:open-shortcuts'));
        });
      }

      bindShortcutActionLinks();
    } catch {}
  }

  function syncActiveAxis(): void {
    const baseUrl = (document.documentElement.dataset.baseUrl || '/').replace(/\/$/, '');
    let cleanPath = window.location.pathname;
    if (baseUrl && cleanPath.startsWith(baseUrl)) {
      cleanPath = cleanPath.slice(baseUrl.length) || '/';
    }
    cleanPath = cleanPath.replace(/\/index\.html$/, '') || '/';

    let activeId = 'hoje';
    if (cleanPath.startsWith('/curso') || cleanPath.startsWith('/calouros') || cleanPath.startsWith('/pesquisa')) {
      activeId = 'curso';
    } else if (
      cleanPath.startsWith('/percurso') ||
      cleanPath.startsWith('/acg') ||
      cleanPath.startsWith('/estagio') ||
      cleanPath.startsWith('/tcc') ||
      cleanPath.startsWith('/optativas')
    ) {
      activeId = 'curriculo';
    } else if (
      cleanPath.startsWith('/documentos') ||
      cleanPath.startsWith('/faq') ||
      cleanPath.startsWith('/mapa-do-site')
    ) {
      activeId = 'acervo';
    } else if (
      cleanPath.startsWith('/sobre') ||
      cleanPath.startsWith('/gestao') ||
      cleanPath.startsWith('/transparencia')
    ) {
      activeId = 'cagp';
    }

    sidebar?.querySelectorAll<HTMLAnchorElement>('[data-axis-link]').forEach((link) => {
      const id = link.getAttribute('data-axis-link');
      const isCurrent = id === activeId;
      link.classList.toggle('is-active', isCurrent);
      link.classList.toggle('bg-[#8B1E2D]', isCurrent);
      link.classList.toggle('text-white', isCurrent);
      link.classList.toggle('font-semibold', isCurrent);
      link.classList.toggle('shadow-2xs', isCurrent);
      link.classList.toggle('text-[#292524]', !isCurrent);
      link.classList.toggle('hover:bg-[#FBF8F3]', !isCurrent);
      link.classList.toggle('hover:text-[#8B1E2D]', !isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    // Inicializa os subnavs: apenas o ativo aberto por padrão
    sidebar?.querySelectorAll<HTMLElement>('[data-axis-subnav]').forEach((sub) => {
      const id = sub.getAttribute('data-axis-subnav');
      const isCurrent = id === activeId;
      sub.classList.toggle('flex', isCurrent);
      sub.classList.toggle('hidden', !isCurrent);
    });

    sidebar?.querySelectorAll<HTMLButtonElement>('[data-axis-accordion-toggle]').forEach((btn) => {
      const id = btn.getAttribute('data-axis-accordion-toggle');
      const isCurrent = id === activeId;
      btn.setAttribute('aria-expanded', isCurrent ? 'true' : 'false');
      const arrow = btn.querySelector('.cagp-accordion-arrow');
      if (arrow) arrow.classList.toggle('rotate-180', isCurrent);
    });
  }

  function setupAccordionHandlers(): void {
    sidebar?.querySelectorAll<HTMLButtonElement>('[data-axis-accordion-toggle]').forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const axisId = btn.getAttribute('data-axis-accordion-toggle');
        if (!axisId) return;

        const subnav = sidebar?.querySelector<HTMLElement>(`[data-axis-subnav="${axisId}"]`);
        if (!subnav) return;

        const isCurrentlyOpen = subnav.classList.contains('flex');
        if (isCurrentlyOpen) {
          subnav.classList.remove('flex');
          subnav.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
          btn.querySelector('.cagp-accordion-arrow')?.classList.remove('rotate-180');
        } else {
          subnav.classList.remove('hidden');
          subnav.classList.add('flex');
          btn.setAttribute('aria-expanded', 'true');
          btn.querySelector('.cagp-accordion-arrow')?.classList.add('rotate-180');
        }
      };
    });
  }

  function bindShortcutActionLinks(): void {
    sidebar?.querySelectorAll<HTMLAnchorElement>('[data-action]').forEach((el) => {
      el.onclick = (e) => {
        const ev = el.getAttribute('data-action');
        if (ev) {
          e.preventDefault();
          closeAnyNav();
          window.dispatchEvent(new CustomEvent(ev));
        }
      };
    });
  }

  function setupTouchSwipe(): void {
    let touchStartX = 0;
    let touchStartY = 0;

    sidebar?.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    sidebar?.addEventListener(
      'touchend',
      (e: TouchEvent) => {
        if (!sidebar.classList.contains('is-mobile-open')) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY);
        // Gesto de swipe para a esquerda fecha a gaveta no mobile
        if (deltaX < -60 && deltaY < 100) {
          closeMobileDrawer();
        }
      },
      { passive: true }
    );
  }

  function bindSidebarActions(): void {
    // 1. Botão Fechar no Mobile (X)
    const closeBtn = document.getElementById('cagp-sidebar-close-btn');
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        closeMobileDrawer();
      };
    }

    // 2. Botão Alternar no Tablet
    const toggleBtn = document.getElementById('cagp-sidebar-toggle-btn');
    if (toggleBtn) {
      toggleBtn.onclick = (e) => {
        e.stopPropagation();
        toggleNav();
      };
    }

    // 3. Toque no Backdrop fecha qualquer menu aberto
    if (backdrop) {
      backdrop.onclick = () => closeAnyNav();
    }

    // 4. Ações de Base (Busca, A11y, Configurações)
    const spotlightBtn = document.getElementById('cagp-sidebar-spotlight-btn');
    if (spotlightBtn) {
      spotlightBtn.onclick = () => {
        closeAnyNav();
        window.dispatchEvent(new CustomEvent('cagp:open-spotlight'));
      };
    }

    const railSpotlightBtn = document.getElementById('cagp-rail-spotlight-btn');
    if (railSpotlightBtn) {
      railSpotlightBtn.onclick = () => {
        closeAnyNav();
        window.dispatchEvent(new CustomEvent('cagp:open-spotlight'));
      };
    }

    const a11yBtn = document.getElementById('cagp-sidebar-a11y-btn');
    if (a11yBtn) {
      a11yBtn.onclick = () => {
        closeAnyNav();
        window.dispatchEvent(new CustomEvent('cagp:open-a11y'));
      };
    }

    const railA11yBtn = document.getElementById('cagp-rail-a11y-btn');
    if (railA11yBtn) {
      railA11yBtn.onclick = () => {
        closeAnyNav();
        window.dispatchEvent(new CustomEvent('cagp:open-a11y'));
      };
    }

    const settingsBtn = document.getElementById('cagp-sidebar-settings-btn');
    if (settingsBtn) {
      settingsBtn.onclick = () => {
        closeAnyNav();
        window.dispatchEvent(new CustomEvent('cagp:open-settings'));
      };
    }

    const railSettingsBtn = document.getElementById('cagp-rail-settings-btn');
    if (railSettingsBtn) {
      railSettingsBtn.onclick = () => {
        closeAnyNav();
        window.dispatchEvent(new CustomEvent('cagp:open-settings'));
      };
    }

    const passportBtn = document.getElementById('cagp-sidebar-passport-btn');
    if (passportBtn) {
      passportBtn.onclick = () => {
        closeAnyNav();
        window.dispatchEvent(new CustomEvent('cagp:open-passport'));
      };
    }

    const editShortcutsBtn = document.getElementById('cagp-sidebar-edit-shortcuts');
    if (editShortcutsBtn) {
      editShortcutsBtn.onclick = () => {
        closeAnyNav();
        window.dispatchEvent(new CustomEvent('cagp:open-shortcuts'));
      };
    }

    // Ao clicar em qualquer link interno na gaveta mobile ou tablet expandido, fecha a navegação
    sidebar?.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
      link.addEventListener('click', () => {
        if (sidebar.classList.contains('is-mobile-open') || sidebar.classList.contains('is-expanded')) {
          closeAnyNav();
        }
      });
    });

    // Tecla Escape fecha qualquer menu aberto
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAnyNav();
    });

    bindShortcutActionLinks();
    setupAccordionHandlers();
    setupTouchSwipe();
  }

  syncSidebarProfile();
  syncSidebarShortcuts();
  syncActiveAxis();
  bindSidebarActions();

  if (!(window as any).__cagp_sidebar_listeners_bound) {
    (window as any).__cagp_sidebar_listeners_bound = true;
    window.addEventListener('cagp:open-drawer', () => {
      if (isMobile()) openMobileDrawer();
      else if (isTablet()) expandSidebar();
    });
    window.addEventListener('cagp:close-drawer', closeAnyNav);
    window.addEventListener('cagp:toggle-drawer', toggleNav);
    window.addEventListener('cagp:vault-updated', () => {
      syncSidebarProfile();
      syncSidebarShortcuts();
    });
  }
}
