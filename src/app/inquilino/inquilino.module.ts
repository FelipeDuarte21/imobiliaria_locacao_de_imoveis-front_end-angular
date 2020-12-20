import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InquilinoRoutingModule} from './inquilino.routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TextMaskModule } from 'angular2-text-mask';

import { InquilinoComponent } from './inquilino.component'
import { ListaComponent } from './lista/lista.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { AtualizaComponent } from './atualiza/atualiza.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PaginacaoComponent } from './lista/paginacao/paginacao.component';
import { PesquisaComponent } from './lista/pesquisa/pesquisa.component';
import { FeedbackCampoComponent } from './cadastro/feedback-campo/feedback-campo.component';

@NgModule({
  declarations: [
    InquilinoComponent, 
    ListaComponent, 
    DetalheComponent, 
    AtualizaComponent, 
    CadastroComponent,
    PaginacaoComponent,
    PesquisaComponent,
    FeedbackCampoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InquilinoRoutingModule,
    PipesModule,
    TextMaskModule
  ],
})
export class InquilinoModule { }