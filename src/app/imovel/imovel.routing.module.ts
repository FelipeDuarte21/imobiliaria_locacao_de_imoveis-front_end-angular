import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImovelComponent } from './imovel.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AtualizaComponent } from './atualiza/atualiza.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { DisponivelComponent } from './disponivel/disponivel.component';

const routes: Routes = [
    {path: '', component: ImovelComponent},
    {path: 'novo', component: CadastroComponent},
    {path: 'atualiza/:id',component: AtualizaComponent},
    {path: 'detalhe/:id',component: DetalheComponent},
    {path: 'disponiveis',component: DisponivelComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImovelRoutingModule{

}