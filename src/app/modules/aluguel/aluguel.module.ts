import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AluguelRoutingModule } from './aluguel.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AluguelComponent } from './aluguel.component';
import { ListaComponent } from './lista/lista.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { AlugueisInquilinoComponent } from './alugueis-inquilino/alugueis-inquilino.component';
import { PaginacaoComponent } from './lista/paginacao/paginacao.component';
import { AtrasadosComponent } from './atrasados/atrasados.component';
import { FeedbackCampoComponent } from './pagamento/feedback-campo/feedback-campo.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { AluguelService } from 'src/app/services/aluguel.service';
import { LocacaoService } from 'src/app/services/locacao.service';

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
		PipesModule
	]
})
export class AluguelModule { }
