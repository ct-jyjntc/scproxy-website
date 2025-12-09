import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ObserveElementDirective } from '../../directives/observe-element.directive';

type PlatformId = 'windows' | 'macos' | 'android' | 'ios' | 'other';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [RouterLink, ObserveElementDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    languageService = inject(LanguageService);
    platform = signal<PlatformId>('macos');

    features = [
      {
        id: 'speed',
        titleKey: 'feature_speed_title',
        descriptionKey: 'feature_speed_desc'
      },
      {
        id: 'security',
        titleKey: 'feature_security_title',
        descriptionKey: 'feature_security_desc'
      },
      {
        id: 'servers',
        titleKey: 'feature_servers_title',
        descriptionKey: 'feature_servers_desc'
      },
      {
        id: 'platforms',
        titleKey: 'feature_platforms_title',
        descriptionKey: 'feature_platforms_desc'
      }
    ];

    primaryDownloadId = computed(() => {
      switch (this.platform()) {
        case 'windows':
          return 'windows';
        case 'android':
          return 'android';
        case 'ios':
          return 'ios';
        default:
          return 'macos';
      }
    });

    primaryDownloadLabel = computed(() => {
      switch (this.primaryDownloadId()) {
        case 'windows':
          return this.languageService.t('download_windows')();
        case 'android':
          return this.languageService.t('download_android')();
        case 'ios':
          return this.languageService.t('download_ios')();
        default:
          return this.languageService.t('download_macos')();
      }
    });

    constructor() {
      this.detectPlatform();
    }

    private detectPlatform() {
      if (typeof navigator === 'undefined') {
        return;
      }
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes('windows')) {
        this.platform.set('windows');
      } else if (ua.includes('mac os') || ua.includes('macintosh')) {
        this.platform.set('macos');
      } else if (ua.includes('android')) {
        this.platform.set('android');
      } else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
        this.platform.set('ios');
      } else {
        this.platform.set('other');
      }
    }
}
