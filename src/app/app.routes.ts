import { Routes } from '@angular/router';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';
import { MainComponent } from './pages/main/main.component';
import { AssinaturaComponent } from './pages/assinatura/assinatura.component';

export const routes: Routes = [
    {path: '', redirectTo: '/relatorio', pathMatch: 'full'},
    {path: 'relatorio', component: RelatorioComponent},
    {path: 'main', component: MainComponent},
    {path: 'assinatura/:id', component: AssinaturaComponent},

];
