import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeComponent } from './components/commande/commande.component';

const routes: Routes = [
  { path: 'commande', component: CommandeComponent },
  { path: '', redirectTo: '/commande', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
