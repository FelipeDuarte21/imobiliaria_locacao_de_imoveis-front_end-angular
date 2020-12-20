import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {api_route} from './api.route';
import { Pessoa } from './models/pessoa.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PessoaDTO } from './models/pessoa.dto.model';

@Injectable()
export class PessoaService{

    public local_route = `${api_route}/pessoa`;

    constructor(private http: Http){}

    public getPorId(id:string): Observable<Pessoa>{
        return this.http.get(`${this.local_route}/${id}`).pipe(map(res => res.json()));
    }

    public getPorCPF(cpf:string): Observable<Pessoa>{
        return this.http.get(`${this.local_route}/cpf?value=${cpf}`).pipe(map(res => res.json()));
    }

    public cadastrar(pessoa: PessoaDTO):Observable<Pessoa>{
        return this.http.post(this.local_route,pessoa).pipe(map(res => res.json()));
    }

    public atualizar(pessoa: PessoaDTO):Observable<Pessoa>{
        return this.http.put(this.local_route,pessoa).pipe(map(res => res.json()));
    }

    public excluir(id: string):Observable<any>{
        return this.http.delete(`${this.local_route}/${id}`);
    }
 
}