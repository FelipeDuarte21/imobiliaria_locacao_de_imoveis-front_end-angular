import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Imovel } from '../models/imovel.model';
import { Page } from '../models/page.model';
import { ImovelDados } from '../models/imovel-dados.model';


@Injectable()
export class ImovelService{

    private local_route:string = `${environment.api_route}/api/v1/imovel`;

    constructor(
        private http:HttpClient
    ){}

    public buscarPorId(id:number):Observable<Imovel>{
        return this.http.get<Imovel>(`${this.local_route}/${id}`);
    }

    public buscarDisponiveisPorPreco(preco:number,page:number,size:number):Observable<Page<Imovel>>{
        return this.http.get<Page<Imovel>>(`${this.local_route}/disponiveis?preco=${preco}&page=${page}&size=${size}`);
    }

    public buscarDisponiveisPorProprietario(id:string):Observable<Array<Imovel>>{
        return this.http.get<Array<Imovel>>(`${this.local_route}/disponivel/proprietario/${id}`);
    }

    public buscarTodosDisponiveis(page:number,size:number):Observable<Page<Imovel>>{
        return this.http.get<Page<Imovel>>(`${this.local_route}/disponivel?page=${page}&size=${size}`);
    }

    public buscarPorIdProprietario(id:string):Observable<Array<Imovel>>{
        return this.http.get<Array<Imovel>>(`${this.local_route}/proprietario/${id}`);
    }

    public buscarPorNomeProprietario(nome:string,page:number,size:number):Observable<Page<Imovel>>{
        return this.http.get<Page<Imovel>>(`${this.local_route}/proprietario?nome=${nome}&page=${page}&size=${size}`);
    }

    public buscarTodos(page:number,size:number):Observable<Page<Imovel>>{
        return this.http.get<Page<Imovel>>(`${this.local_route}?page=${page}&size=${size}`);
    }

    public cadastrar(imovel:ImovelDados):Observable<Imovel>{
        return this.http.post<Imovel>(this.local_route,imovel);
    }

    public atualizar(id: number, imovel:ImovelDados):Observable<Imovel>{
        return this.http.put<Imovel>(`${this.local_route}/${id}`,imovel);
    }

    public excluir(id:number):Observable<any>{
        return this.http.delete(`${this.local_route}/${id}`);
    }

}