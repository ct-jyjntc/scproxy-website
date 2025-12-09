
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, title: 'SCPROXY - Home' },
  { path: 'downloads', component: DownloadsComponent, title: 'SCPROXY - Downloads' },
  { path: 'terms', component: TermsComponent, title: 'SCPROXY - Terms of Service' },
  { path: 'privacy', component: PrivacyComponent, title: 'SCPROXY - Privacy Policy' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
