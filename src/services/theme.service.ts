import { DOCUMENT } from '@angular/common';
import { Injectable, signal, inject } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private documentRef = inject(DOCUMENT);
  private isBrowser = typeof window !== 'undefined' && !!this.documentRef?.documentElement;
  theme = signal<Theme>('dark');

  constructor() {
    this.loadTheme();
    this.syncDomTheme(this.theme());
  }

  loadTheme() {
    if (!this.isBrowser) {
      return;
    }
    try {
      const savedTheme = localStorage.getItem('scpxy_theme') as Theme;
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        this.theme.set(savedTheme);
        return;
      }
    } catch {
      /* ignore read errors */
    }

    this.theme.set('light');
    this.syncDomTheme(this.theme());
  }

  toggleTheme() {
    // No-op: theme is fixed to light
    this.theme.set('light');
    this.syncDomTheme(this.theme());
  }

  private syncDomTheme(currentTheme: Theme) {
    if (!this.isBrowser) {
      return;
    }
    const root = this.documentRef.documentElement;
    const body = this.documentRef.body;

    root.classList.toggle('dark', currentTheme === 'dark');
    body?.classList.toggle('dark', currentTheme === 'dark');
    root.style.colorScheme = currentTheme;
    root.dataset.theme = currentTheme;

    try {
      localStorage.setItem('scpxy_theme', currentTheme);
    } catch {
      /* ignore write errors (e.g., privacy mode) */
    }
  }
}
