import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { api_route } from './api.route';
import { Locacao } from './models/locacao.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageLocacao } from './models/pages/locacao.page.model';
import { ProprietarioService } from './proprietario.service';
import { Pessoa } from './models/pessoa.model';
import { InquilinoService } from './inquilino.service';
import { ImovelService } from './imovel.service';
import { Imovel } from './models/imovel.model';
import { LocacaoDTO } from './models/locacao.dto.model';

@Injectable()
export class LocacaoService{

    private local_route = `${api_route}/locacao`;
    
    constructor(
        private http: Http,
        private proprietarioService:ProprietarioService,
        private inquilinoService:InquilinoService,
        private imovelService:ImovelService){}

    public alugar(locacao:LocacaoDTO):Observable<Locacao>{
        return this.http.post(this.local_route,locacao).pipe(map(res => res.json()));
    }

    public atualizar(locacao:LocacaoDTO):Observable<Locacao>{
        return this.http.put(this.local_route,locacao).pipe(map(res => res.json()));
    }

    public excluir(id:string):Observable<any>{
        return this.http.delete(`${this.local_route}/${id}`);
    }

    public buscarPorId(id:string):Observable<Locacao>{
        return this.http.get(`${this.local_route}/${id}`).pipe(map(res => res.json()));
    }

    public buscarLocacoesInquilino(id:string,page:number,size:number):Observable<PageLocacao>{
        return this.http.get(`${this.local_route}/inquilino/${id}?page=${page}&size=${size}`)
            .pipe(map(res => res.json()));
    }

    public buscarLocacoesInquilinosPorNome(nome:string,page:number,size:number):Observable<PageLocacao>{
        return this.http.get(`${this.local_route}/inquilino/search?nome=${nome}&page=${page}&size=${size}`)
            .pipe(map(res => res.json()));
    }

    public buscarLocacoesProprietariosPorNome(nome:string,page:number,size:number):Observable<PageLocacao>{
        return this.http.get(`${this.local_route}/proprietario/search?nome=${nome}&page=${page}&size=${size}`)
            .pipe(map(res => res.json()));
    }

    public buscarTodos(page:number,size:number):Observable<PageLocacao>{
        return this.http.get(`${this.local_route}?page=${page}&size=${size}`).pipe(map(res => res.json()));
    }

    public buscarTodosSemPagina():Observable<Array<Locacao>>{
        return this.http.get(`${this.local_route}/all`).pipe(map(res => res.json()));
    }

    //Metodos que encapsulam outros metodos de outros serviços

    public buscarProprietarios():Observable<Array<Pessoa>>{
        return this.proprietarioService.getTodosSemPagina();
    }

    public buscarInquilinos():Observable<Array<Pessoa>>{
        return this.inquilinoService.getTodosSemPagina();
    }

    public buscarImoveisDisponiveisPorProprietario(id:string):Observable<Array<Imovel>>{
        return this.imovelService.buscarDisponiveisPorProprietario(id);
    }

    public buscarImoveisProprietarioPorId(id:string): Observable<Array<Imovel>>{
        return this.imovelService.buscarPorIdProprietario(id);
    }

}