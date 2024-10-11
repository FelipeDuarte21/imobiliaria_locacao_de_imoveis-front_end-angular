import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Aluguel } from 'src/app/models/aluguel.model';
import { LocacaoService } from 'src/app/services/locacao.service';

@Component({
	selector: 'alugueis-inquilino',
	templateUrl: './alugueis-inquilino.component.html',
	styleUrls: ['./alugueis-inquilino.component.css']
})
export class AlugueisInquilinoComponent implements OnInit {

	private id: string;

	private page: number = 0;
	private size: number = 6;

	private totalPages = 0;

	public optPagina = ['6', '9', '12'];

	public aluguel: Aluguel;
	public alugueis: Array<Aluguel>;

	private inscricao: Subscription;

	constructor(
		private route: ActivatedRoute,
		private locacaoService: LocacaoService
	) { }

	ngOnInit() {
		this.inscricao = this.route.params.subscribe({
			next: params => {
				this.id = params['id'];
				this.buscarAlugueis(this.id, this.page, this.size);
			}
		});
	}

	setSize(size: number) {
		this.size = size;
		this.buscarAlugueis(this.id, 0, this.size);
	}

	getTotalPage() {
		return this.totalPages;
	}

	buscarPorPagina(pagina: number) {
		this.buscarAlugueis(this.id, pagina, this.size);
	}

	buscarAlugueis(id: string, page: number, size: number) {
		this.locacaoService.buscarAlugueis(id, page, size).subscribe({
			next: alugueis => {
				this.alugueis = alugueis.content;
				this.totalPages = alugueis.totalPages;
				this.aluguel = this.alugueis[0];
			}
		});
	}

	ngOnDestroy() {
		this.inscricao.unsubscribe();
	}

}
