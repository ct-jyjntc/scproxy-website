import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
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

  selectTab(tab: 'desktop' | 'mobile') {
    this.activeTab.set(tab);
    this.selectedOsId.set(tab === 'desktop' ? 'windows' : 'android');
  }

  selectOs(osId: string) {
    this.selectedOsId.set(osId);
  }
}
