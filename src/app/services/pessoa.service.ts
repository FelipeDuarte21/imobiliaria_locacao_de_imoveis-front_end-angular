import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { Pessoa } from '../models/pessoa.model';
import { PessoaDados } from '../models/pessoa-dados.model';


@Injectable()
export class PessoaService{

    public local_route = `${environment.api_route}/api/v1/pessoa`;

    constructor(
        private http: HttpClient
    ){}

    public getPorId(id:number): Observable<Pessoa>{ 
        return this.http.get<Pessoa>(`${this.local_route}/${id}`);
    }

    public getPorCPF(cpf:string): Observable<Pessoa>{
        return this.http.get<Pessoa>(`${this.local_route}?cpf=${cpf}`);
    }

    public cadastrar(pessoa: PessoaDados):Observable<Pessoa>{
        return this.http.post<Pessoa>(this.local_route,pessoa);
    }

    public atualizar(id: number, pessoa: PessoaDados):Observable<Pessoa>{
        return this.http.put<Pessoa>(`${this.local_route}/${id}`,pessoa);
    }

    public excluir(id: number):Observable<any>{
        return this.http.delete(`${this.local_route}/${id}`);
    }
 
}