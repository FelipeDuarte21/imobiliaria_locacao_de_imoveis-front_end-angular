import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { api_route } from './api.route';
import { EnderecoService } from './endereco.service';

import { Observable } from 'rxjs';

import { EnderecoAPI } from './models/endereco.api.model';
import { Imovel } from './models/imovel.model';
import { PageImovel } from './models/pages/imovel.page.model';
import { ProprietarioService } from './proprietario.service';
import { Pessoa } from './models/pessoa.model';
import { ImovelDTO } from './models/imovel.dto.model';

@Injectable()
export class ImovelService{

    private local_route:string = `${api_route}/imovel`;

    constructor(
        private http:HttpClient,
        private enderecoService:EnderecoService,
        private proprietarioService:ProprietarioService){}

    public buscarPorId(id:string):Observable<Imovel>{
        return this.http.get<Imovel>(`${this.local_route}/${id}`);
    }

    public buscarDisponiveisPorPreco(preco:number,page:number,size:number):Observable<PageImovel>{
        return this.http.get<PageImovel>(`${this.local_route}/disponivel/search?preco=${preco}&page=${page}&size=${size}`);
    }

    public buscarDisponiveisPorProprietario(id:string):Observable<Array<Imovel>>{
        return this.http.get<Array<Imovel>>(`${this.local_route}/disponivel/proprietario/${id}`);
    }

    public buscarTodosDisponiveis(page:number,size:number):Observable<PageImovel>{
        return this.http.get<PageImovel>(`${this.local_route}/disponivel?page=${page}&size=${size}`);
    }

    public buscarPorIdProprietario(id:string):Observable<Array<Imovel>>{
        return this.http.get<Array<Imovel>>(`${this.local_route}/proprietario/${id}`);
    }

    public buscarPorNomeProprietario(nome:string,page:number,size:number):Observable<PageImovel>{
        return this.http.get<PageImovel>(`${this.local_route}/proprietario/search?nome=${nome}`);
    }

    public buscarTodosProprietarios():Observable<Array<Pessoa>>{
        return this.proprietarioService.getTodosSemPagina();
    }

    public buscarTodos(page:number,size:number):Observable<PageImovel>{
        return this.http.get<PageImovel>(`${this.local_route}?page=${page}&size=${size}`);
    }

    public buscarTodosSemPagina():Observable<Array<Imovel>>{
        return this.http.get<Array<Imovel>>(`${this.local_route}/all`);
    }

    public cadastrar(imovel:ImovelDTO):Observable<Imovel>{
        return this.http.post<Imovel>(this.local_route,imovel);
    }

    public atualizar(imovel:ImovelDTO):Observable<Imovel>{
        return this.http.put<Imovel>(this.local_route,imovel);
    }

    public excluir(id:string):Observable<any>{
        return this.http.delete(`${this.local_route}/${id}`);
    }

    public buscarPorCep(cep:string):Observable<EnderecoAPI>{
        return this.enderecoService.buscarPorCep(cep);
    }

}