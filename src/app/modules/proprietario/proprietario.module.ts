import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProprietarioRoutingModule } from './proprietario.routing.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { ProprietarioComponent } from './proprietario.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { ListaComponent } from './lista/lista.component';
import { AtualizaComponent } from './atualiza/atualiza.component';
import { PaginacaoComponent } from './lista/paginacao/paginacao.component';
import { PesquisaComponent } from './lista/pesquisa/pesquisa.component';

import { FeedbackCampoComponent } from './cadastro/feedback-campo/feedback-campo.component';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';

@NgModule({
	declarations: [
		ProprietarioComponent,
		CadastroComponent,
		DetalheComponent,
		ListaComponent,
		AtualizaComponent,
		PaginacaoComponent, 
		PesquisaComponent,
		FeedbackCampoComponent
	],
	imports: [
		CommonModule,
		ProprietarioRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		PipesModule,
		NgxMaskDirective, 
		NgxMaskPipe
	],
	providers: [
		provideEnvironmentNgxMask()
	]
})
export class ProprietarioModule { }
