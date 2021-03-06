import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquilinoComponent } from './inquilino.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AtualizaComponent } from './atualiza/atualiza.component';
import { DetalheComponent } from './detalhe/detalhe.component';

const routes: Routes = [
    {path: '', component: InquilinoComponent},
    {path: 'novo', component: CadastroComponent},
    {path: 'atualiza/:id', component: AtualizaComponent},
    {path: 'detalhe/:id', component: DetalheComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InquilinoRoutingModule{

}