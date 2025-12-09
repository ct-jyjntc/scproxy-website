import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ObserveElementDirective } from '../../directives/observe-element.directive';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink, ObserveElementDirective],
  templateUrl: './pricing.component.html'
})
export class PricingComponent {
  constructor(public languageService: LanguageService) {}

  plans = [
    {
      id: 'monthly',
      nameKey: 'plan_monthly',
      priceKey: 'price_monthly',
      periodKey: 'period_monthly',
      features: ['feature_all_servers', 'feature_high_speed', 'feature_no_logs', 'feature_devices', 'feature_support'],
      popular: false
    },
    {
      id: 'yearly',
      nameKey: 'plan_yearly',
      priceKey: 'price_yearly',
      periodKey: 'period_yearly',
      features: ['feature_all_servers', 'feature_high_speed', 'feature_no_logs', 'feature_devices', 'feature_support', 'feature_save'],
      popular: true
    },
    {
      id: 'lifetime',
      nameKey: 'plan_lifetime',
      priceKey: 'price_lifetime',
      periodKey: 'period_lifetime',
      features: ['feature_all_servers', 'feature_high_speed', 'feature_no_logs', 'feature_devices', 'feature_support'],
      popular: false
    }
  ];
}
