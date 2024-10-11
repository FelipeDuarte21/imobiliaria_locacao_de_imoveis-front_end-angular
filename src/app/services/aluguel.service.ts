import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aluguel } from '../models/aluguel.model';
import { Page } from '../models/page.model';


@Injectable()
export class AluguelService{

    private local_route:string = `${environment.api_route}/api/v1/aluguel`;

    constructor(
        private http: HttpClient
    ){}

    public buscarPorId(id:string):Observable<Aluguel>{
        return this.http.get<Aluguel>(`${this.local_route}/${id}`);
    }

    public buscarPorPeriodo(inicio:string,fim:string,page:number,size:number): Observable<Page<Aluguel>>{
        return this.http.get<Page<Aluguel>>(`${this.local_route}/periodo?inicio=${inicio}&fim=${fim}&page=${page}&size=${size}`);
    }

    public buscarPorAtrasado(page:number,size:number):Observable<Page<Aluguel>>{
        return this.http.get<Page<Aluguel>>(`${this.local_route}/atrasados?page=${page}&size=${size}`);
    }

    public buscarTodos(page:number,size:number):Observable<Page<Aluguel>>{
        return this.http.get<Page<Aluguel>>(`${this.local_route}?page=${page}&size=${size}`);
    }

    public registrarPagamento(idAluguel:string):Observable<Aluguel>{
        return this.http.put<Aluguel>(`${this.local_route}/${idAluguel}`,null);
    }

}