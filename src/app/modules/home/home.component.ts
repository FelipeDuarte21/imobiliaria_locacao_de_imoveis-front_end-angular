import { Component, OnInit } from '@angular/core';
import { ProprietarioService } from 'src/app/services/proprietario.service';
import { InquilinoService } from 'src/app/services/inquilino.service';
import { ImovelService } from 'src/app/services/imovel.service';
import { LocacaoService } from 'src/app/services/locacao.service';
import { AluguelService } from 'src/app/services/aluguel.service';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public totais = {
		proprietarios: 0,
		inquilinos: 0,
		imoveis: 0,
		locacoes: 0,
		alugueis: 0
	}

	constructor(
		private proprietarioService: ProprietarioService,
		private inquilinoService: InquilinoService,
		private imovelService: ImovelService,
		private locacaoService: LocacaoService,
		private alugueisService: AluguelService
	) { }

	ngOnInit() {

		this.proprietarioService.getTodos(0,1).subscribe({
			next: proprietarios => {
				this.totais.proprietarios = proprietarios.totalElements;
			},
			error: error => {
				this.totais.proprietarios = 0;
			}
		});
		
		this.inquilinoService.getTodos(0,1).subscribe({
			next: inquilinos => {
				this.totais.inquilinos = inquilinos.totalElements;
			},
			error: error => {
				this.totais.inquilinos = 0;
			}
		});
		
		this.imovelService.buscarTodos(0,1).subscribe({
			next: imoveis => {
				this.totais.imoveis = imoveis.totalElements;
			},
			error: error => {
				this.totais.imoveis = 0;
			}
		});
		
		this.locacaoService.buscarTodos(0,1).subscribe({
			next: locacoes => {
				this.totais.locacoes = locacoes.totalElements;
			},
			error: error => {
				this.totais.locacoes = 0;
			}
		});
		
		this.alugueisService.buscarPorAtrasado(0,1).subscribe({
			next: alugueis => {
				this.totais.alugueis = alugueis.totalElements
			},
			error: error => {
				this.totais.alugueis = 0;
			}
		});

	}

} 
