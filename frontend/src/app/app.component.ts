import { Component } from '@angular/core';
import { CommandeComponent } from './components/commande/commande.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, CommandeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'Mon application';
}
