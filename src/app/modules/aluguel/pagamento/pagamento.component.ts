import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Aluguel } from 'src/app/models/aluguel.model';
import { AluguelService } from 'src/app/services/aluguel.service';

@Component({
	selector: 'pagamento',
	templateUrl: './pagamento.component.html',
	styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent implements OnInit {

	private inscricao: Subscription;

	public aluguel: Aluguel;

	public sucesso: boolean = false;
	public erro: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private aluguelService: AluguelService
	) { }

	ngOnInit() {

		this.inscricao = this.route.params.subscribe({
			next: params => {
				this.buscarAluguel(params['id']);
			}
		});
		
	}

	buscarAluguel(id: string) {
		this.aluguelService.buscarPorId(id).subscribe({
			next: aluguel => {
				this.aluguel = aluguel;
			}
		});
	}


	registrarPagamento() {
		this.aluguelService.registrarPagamento(`${this.aluguel.id}`).subscribe({
			next: res => {
				this.sucesso = true;
			},
			error: error => {
				this.erro = true;
			}
		});
		
	}

	ngOnDestroy() {
		this.inscricao.unsubscribe();
	}

} 
