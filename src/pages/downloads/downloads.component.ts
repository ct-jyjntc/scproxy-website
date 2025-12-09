import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService, TranslationKey } from '../../services/language.service';
import { ObserveElementDirective } from '../../directives/observe-element.directive';

interface AppInfo {
  id: string;
  name: string;
  descriptionKey: TranslationKey;
  version: string;
  releaseDate: string;
  icon: string; // SVG path
}

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [ObserveElementDirective],
  templateUrl: './downloads.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsComponent {
  languageService = inject(LanguageService);
  route = inject(ActivatedRoute);
  activeTab = signal<'desktop' | 'mobile'>('desktop');
  selectedOsId = signal<string>('windows');

  desktopApps: AppInfo[] = [
    {
      id: 'windows',
      name: 'Windows',
      descriptionKey: 'windows_desc',
      version: '1.2.5',
      releaseDate: '2024-07-15',
      icon: ''
    },
    {
      id: 'macos',
      name: 'macOS',
      descriptionKey: 'macos_desc',
      version: '1.2.5',
      releaseDate: '2024-07-15',
      icon: ''
    }
  ];

  mobileApps: AppInfo[] = [
     {
      id: 'android',
      name: 'Android',
      descriptionKey: 'android_desc',
      version: '1.1.0',
      releaseDate: '2024-06-20',
      icon: ''
    },
    {
      id: 'ios',
      name: 'iOS',
      descriptionKey: 'ios_desc',
      version: '1.1.0',
      releaseDate: '2024-06-20',
      icon: ''
    }
  ];

  appsToShow = computed(() => {
    return this.activeTab() === 'desktop' ? this.desktopApps : this.mobileApps;
  });

  selectedAppData = computed(() => {
    const apps = this.appsToShow();
    return apps.find(app => app.id === this.selectedOsId()) ?? apps[0];
  });

  constructor() {
    const queryOs = this.route.snapshot.queryParamMap.get('os');
    if (queryOs && this.setInitialSelection(queryOs)) {
      return;
    }
    this.setInitialSelection(this.selectedOsId());
  }

  selectTab(tab: 'desktop' | 'mobile') {
    this.activeTab.set(tab);
    this.selectedOsId.set(tab === 'desktop' ? 'windows' : 'android');
  }

  selectOs(osId: string) {
    this.selectedOsId.set(osId);
  }

  private setInitialSelection(osId: string): boolean {
    const isDesktop = this.desktopApps.some(app => app.id === osId);
    const isMobile = this.mobileApps.some(app => app.id === osId);
    if (isDesktop) {
      this.activeTab.set('desktop');
      this.selectedOsId.set(osId);
      return true;
    }
    if (isMobile) {
      this.activeTab.set('mobile');
      this.selectedOsId.set(osId);
      return true;
    }
    return false;
  }
}
