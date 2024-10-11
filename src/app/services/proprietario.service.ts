import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PessoaService } from './pessoa.service';

import { Page } from '../models/page.model';
import { Pessoa } from '../models/pessoa.model';
import { PessoaDados } from '../models/pessoa-dados.model';


@Injectable()
export class ProprietarioService {

	constructor(
		private http: HttpClient,
		private pessoaService: PessoaService
	) { }

	public getTodos(page: number, size: number): Observable<Page<Pessoa>> {
		return this.http.get<Page<Pessoa>>(`${this.pessoaService.local_route}/proprietarios?page=${page}&size=${size}`);
	}

	public getPorNome(nome: string, page: number, size: number): Observable<Page<Pessoa>> {
		return this.http.get<Page<Pessoa>>(`${this.pessoaService.local_route}/proprietario?nome=${nome}&page=${page}&size=${size}`);
	}

	public getPorId(id: number): Observable<Pessoa> {
		return this.pessoaService.getPorId(id);
	}

	public getPorCPF(cpf: string): Observable<Pessoa> {
		return this.pessoaService.getPorCPF(cpf);
	}

	public cadastrar(proprietario: PessoaDados): Observable<Pessoa> {
		return this.pessoaService.cadastrar(proprietario);
	}

	public atualizar(id:number, proprietario: PessoaDados): Observable<Pessoa> {
		return this.pessoaService.atualizar(id, proprietario);
	}

	public excluir(id: number): Observable<any> {
		return this.pessoaService.excluir(id);
	}

}
