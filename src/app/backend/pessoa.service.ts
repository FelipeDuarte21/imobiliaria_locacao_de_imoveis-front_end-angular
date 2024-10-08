import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {api_route} from './api.route';
import { Pessoa } from './models/pessoa.model';
import { Observable } from 'rxjs';
import { PessoaDTO } from './models/pessoa.dto.model';

@Injectable()
export class PessoaService{

    public local_route = `${api_route}/pessoa`;

    constructor(private http: HttpClient){}

    public getPorId(id:string): Observable<Pessoa>{
        return this.http.get<Pessoa>(`${this.local_route}/${id}`);
    }

    public getPorCPF(cpf:string): Observable<Pessoa>{
        return this.http.get<Pessoa>(`${this.local_route}/cpf?value=${cpf}`);
    }

    public cadastrar(pessoa: PessoaDTO):Observable<Pessoa>{
        return this.http.post<Pessoa>(this.local_route,pessoa);
    }

    public atualizar(pessoa: PessoaDTO):Observable<Pessoa>{
        return this.http.put<Pessoa>(this.local_route,pessoa);
    }

    public excluir(id: string):Observable<any>{
        return this.http.delete(`${this.local_route}/${id}`);
    }
 
}