import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http'; // Import du HttpClientModule
import { provideHttpClient } from '@angular/common/http'; // Fournir HttpClient

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),   // Assure-toi que HttpClient est fourni ici
    HttpClientModule       // Ajoute HttpClientModule dans les providers
  ]
});
