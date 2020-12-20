import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { api_route } from './api.route';
import { EnderecoService } from './endereco.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        private http:Http,
        private enderecoService:EnderecoService,
        private proprietarioService:ProprietarioService){}

    public buscarPorId(id:string):Observable<Imovel>{
        return this.http.get(`${this.local_route}/${id}`).pipe(map(res => res.json()));
    }

    public buscarDisponiveisPorPreco(preco:number,page:number,size:number):Observable<PageImovel>{
        return this.http.get(`${this.local_route}/disponivel/search?preco=${preco}&page=${page}&size=${size}`)
            .pipe(map(res => res.json()));
    }

    public buscarDisponiveisPorProprietario(id:string):Observable<Array<Imovel>>{
        return this.http.get(`${this.local_route}/disponivel/proprietario/${id}`)
            .pipe(map(res => res.json()));
    }

    public buscarTodosDisponiveis(page:number,size:number):Observable<PageImovel>{
        return this.http.get(`${this.local_route}/disponivel?page=${page}&size=${size}`)
            .pipe(map(res => res.json()));
    }

    public buscarPorIdProprietario(id:string):Observable<Array<Imovel>>{
        return this.http.get(`${this.local_route}/proprietario/${id}`).pipe(map(res => res.json()));
    }

    public buscarPorNomeProprietario(nome:string,page:number,size:number):Observable<PageImovel>{
        return this.http.get(`${this.local_route}/proprietario/search?nome=${nome}`).pipe(map(res => res.json()));
    }

    public buscarTodosProprietarios():Observable<Array<Pessoa>>{
        return this.proprietarioService.getTodosSemPagina();
    }

    public buscarTodos(page:number,size:number):Observable<PageImovel>{
        return this.http.get(`${this.local_route}?page=${page}&size=${size}`).pipe(map(res => res.json()));
    }

    public buscarTodosSemPagina():Observable<Array<Imovel>>{
        return this.http.get(`${this.local_route}/all`).pipe(map(res => res.json()));
    }

    public cadastrar(imovel:ImovelDTO):Observable<Imovel>{
        return this.http.post(this.local_route,imovel).pipe(map(res => res.json()));
    }

    public atualizar(imovel:ImovelDTO):Observable<Imovel>{
        return this.http.put(this.local_route,imovel).pipe(map(res => res.json()));
    }

    public excluir(id:string):Observable<any>{
        return this.http.delete(`${this.local_route}/${id}`);
    }

    public buscarPorCep(cep:string):Observable<EnderecoAPI>{
        return this.enderecoService.buscarPorCep(cep);
    }

}