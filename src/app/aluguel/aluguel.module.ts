import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AluguelRoutingModule } from './aluguel.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { PipesModule } from './../pipes/pipes.module';

import { AluguelComponent } from './aluguel.component';
import { ListaComponent } from './lista/lista.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { AlugueisInquilinoComponent } from './alugueis-inquilino/alugueis-inquilino.component';
import { PaginacaoComponent } from './lista/paginacao/paginacao.component';
import { AtrasadosComponent } from './atrasados/atrasados.component';
import { FeedbackCampoComponent } from './pagamento/feedback-campo/feedback-campo.component';

@NgModule({
  declarations: [
    AluguelComponent, 
    ListaComponent, 
    PagamentoComponent, 
    AlugueisInquilinoComponent,
    PaginacaoComponent,
    AtrasadosComponent,
    FeedbackCampoComponent
  ],
  imports: [
    CommonModule,
    AluguelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    PipesModule
  ]
})
export class AluguelModule { }
