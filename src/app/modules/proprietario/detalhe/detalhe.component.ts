import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa.model';
import { ProprietarioService } from 'src/app/services/proprietario.service';


@Component({
	selector: 'detalhe',
	templateUrl: './detalhe.component.html',
	styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

	private id: number;
	private inscricao: Subscription;

	public proprietario: Pessoa;

	constructor(
		private route: ActivatedRoute, 
		private proprietarioService: ProprietarioService
	) { }

	ngOnInit() {
		this.inscricao = this.route.params.subscribe({
			next: params => {
				this.id = params['id'];
			}
		});
			
		this.buscarProprietarioPorId(this.id);
	}

	buscarProprietarioPorId(id: number) {
		this.proprietarioService.getPorId(id).subscribe({
			next: res => {
				this.proprietario = res;
			}
		});
	}

	ngOnDestroy() {
		this.inscricao.unsubscribe();
	}

}
