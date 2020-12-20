import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { ProprietarioComponent } from './proprietario.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { AtualizaComponent } from './atualiza/atualiza.component';


const routes: Routes = [
    {path: '', component: ProprietarioComponent},
    {path: 'novo', component: CadastroComponent},
    {path: 'atualiza/:id',component: AtualizaComponent},
    {path: 'detalhe/:id', component: DetalheComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProprietarioRoutingModule{

}