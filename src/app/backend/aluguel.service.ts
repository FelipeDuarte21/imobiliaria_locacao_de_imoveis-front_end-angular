import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluguel } from './models/aluguel.model';
import { api_route } from './api.route';
import { PageAluguel } from './models/pages/aluguel.page.model';

@Injectable()
export class AluguelService{

    private local_route:string = `${api_route}/aluguel`;

    constructor(private http: HttpClient){}

    public buscarPorId(id:string):Observable<Aluguel>{
        return this.http.get<Aluguel>(`${this.local_route}/${id}`);
    }

    public buscarPorPeriodo(inicio:string,fim:string,page:number,size:number): Observable<PageAluguel>{
        return this.http.get<PageAluguel>(`${this.local_route}/periodo?inicio=${inicio}&fim=${fim}&page=${page}&size=${size}`);
    }

    public buscarPorAtrasado(page:number,size:number):Observable<PageAluguel>{
        return this.http.get<PageAluguel>(`${this.local_route}/atrasados?page=${page}&size=${size}`);
    }

    public buscarPorAtrasadoSemPagina():Observable<Array<Aluguel>>{
        return this.http.get<Array<Aluguel>>(`${this.local_route}/atrasados/all`);
    }

    public buscarPorLocacao(idLocacao:string,page:number,size:number):Observable<PageAluguel>{
        return this.http.get<PageAluguel>(`${this.local_route}/locacao/${idLocacao}?page=${page}&size=${size}`);
    }

    public buscarTodos(page:number,size:number):Observable<PageAluguel>{
        return this.http.get<PageAluguel>(`${this.local_route}?page=${page}&size=${size}`);
    }

    public registrarPagamento(idAluguel:string):Observable<Aluguel>{
        return this.http.put<Aluguel>(`${this.local_route}/${idAluguel}`,null);
    }

}