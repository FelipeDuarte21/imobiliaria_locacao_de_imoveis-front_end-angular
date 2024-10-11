import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { Page } from '../models/page.model';
import { LocacaoDados } from '../models/locacao-dados.model';
import { Locacao } from '../models/locacao.model';
import { Aluguel } from '../models/aluguel.model';


@Injectable()
export class LocacaoService{

    private local_route = `${environment.api_route}/api/v1/locacao`;
    
    constructor(
        private http: HttpClient
    ){}

    public alugar(locacao: LocacaoDados):Observable<Locacao>{
        return this.http.post<Locacao>(this.local_route,locacao);
    }

    public atualizar(id: number, locacao:LocacaoDados):Observable<Locacao>{
        return this.http.put<Locacao>(`${this.local_route}/${id}`,locacao);
    }

    public excluir(id:number):Observable<any>{
        return this.http.delete(`${this.local_route}/${id}`);
    }

    public buscarPorId(id:number):Observable<Locacao>{
        return this.http.get<Locacao>(`${this.local_route}/${id}`);
    }

    public buscarLocacoesInquilino(id:string,page:number,size:number):Observable<Page<Locacao>>{
        return this.http.get<Page<Locacao>>(`${this.local_route}/inquilino/${id}?page=${page}&size=${size}`);
    }

    public buscarLocacoesInquilinosPorNome(nome:string,page:number,size:number):Observable<Page<Locacao>>{
        return this.http.get<Page<Locacao>>(`${this.local_route}/inquilino?nome=${nome}&page=${page}&size=${size}`);
    }

    public buscarLocacoesProprietariosPorNome(nome:string,page:number,size:number):Observable<Page<Locacao>>{
        return this.http.get<Page<Locacao>>(`${this.local_route}/proprietario?nome=${nome}&page=${page}&size=${size}`);
    }

    public buscarTodos(page:number,size:number):Observable<Page<Locacao>>{
        return this.http.get<Page<Locacao>>(`${this.local_route}?page=${page}&size=${size}`);
    }

    public buscarAlugueis(id:string,page:number,size:number):Observable<Page<Aluguel>>{
        return this.http.get<Page<Aluguel>>(`${this.local_route}/${id}/alugueis?page=${page}&size=${size}`);
    }
 
}