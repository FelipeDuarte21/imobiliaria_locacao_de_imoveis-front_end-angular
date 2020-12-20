import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocacaoRoutingModule } from './locacao.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { LocacaoComponent } from './locacao.component';
import { ListaComponent } from './lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AtualizaComponent } from './atualiza/atualiza.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { FeedbackCampoComponent } from './cadastro/feedback-campo/feedback-campo.component';
import { PaginacaoComponent } from './lista/paginacao/paginacao.component';
import { PesquisaComponent } from './lista/pesquisa/pesquisa.component';

@NgModule({
  declarations: [
    LocacaoComponent, 
    ListaComponent, 
    CadastroComponent, 
    AtualizaComponent, 
    DetalheComponent,
    FeedbackCampoComponent,
    PaginacaoComponent,
    PesquisaComponent
  ],
  imports: [
    CommonModule,
    LocacaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    PipesModule
  ]
})
export class LocacaoModule { }
