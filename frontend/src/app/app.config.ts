import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // ✅ Importer la fonction

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const routes: Routes = [
  // tes routes ici
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(), // ✅ Ajouter cette ligne
  ]
};
