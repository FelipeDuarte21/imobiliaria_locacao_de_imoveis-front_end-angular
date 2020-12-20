import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImovelRoutingModule } from './imovel.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TextMaskModule } from 'angular2-text-mask';

import { ImovelComponent } from './imovel.component';
import { ListaComponent } from './lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AtualizaComponent } from './atualiza/atualiza.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { DisponivelComponent } from './disponivel/disponivel.component';
import { PaginacaoComponent } from './lista/paginacao/paginacao.component';
import { PesquisaComponent } from './lista/pesquisa/pesquisa.component';
import { FeedbackCampoComponent } from './cadastro/feedback-campo/feedback-campo.component';



@NgModule({
  declarations: [
    ImovelComponent, 
    ListaComponent,
    CadastroComponent,
    AtualizaComponent,
    DetalheComponent,
    DisponivelComponent,
    PaginacaoComponent,
    PesquisaComponent,
    FeedbackCampoComponent
  ],
  imports: [
    CommonModule,
    ImovelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    TextMaskModule
  ]
})
export class ImovelModule { }
