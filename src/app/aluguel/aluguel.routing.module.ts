import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AluguelComponent } from './aluguel.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { AlugueisInquilinoComponent } from './alugueis-inquilino/alugueis-inquilino.component';
import { AtrasadosComponent } from './atrasados/atrasados.component';

const routes: Routes = [
    {path: '', component: AluguelComponent},
    {path: 'atrasados', component: AtrasadosComponent},
    {path: 'pagar/:id', component: PagamentoComponent},
    {path: 'alugueis/:id', component: AlugueisInquilinoComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AluguelRoutingModule{

}