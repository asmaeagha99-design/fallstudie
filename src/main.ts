import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { App, Registration, Confirmation, Information } from './app';

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter([
      { path: '', component: Registration, title: 'Kleiderspende registrieren | Kleiderbrücke' },
      { path: 'bestaetigung', component: Confirmation, title: 'Registrierung bestätigt | Kleiderbrücke' },
      { path: 'geschaeftsstelle', component: Information, data: { page: 'office' }, title: 'Geschäftsstelle | Kleiderbrücke' },
      { path: 'impressum', component: Information, data: { page: 'legal' }, title: 'Impressum | Kleiderbrücke' },
      { path: 'datenschutz', component: Information, data: { page: 'privacy' }, title: 'Datenschutz | Kleiderbrücke' },
      { path: '**', redirectTo: '' }
    ], withHashLocation())
  ]
}).catch(console.error);
