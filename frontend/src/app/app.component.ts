import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommandeComponent } from './components/commande/commande.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommandeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mon application';
}

