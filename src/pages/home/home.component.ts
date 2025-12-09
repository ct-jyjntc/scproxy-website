import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ObserveElementDirective } from '../../directives/observe-element.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [RouterLink, ObserveElementDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    languageService = inject(LanguageService);

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
}
