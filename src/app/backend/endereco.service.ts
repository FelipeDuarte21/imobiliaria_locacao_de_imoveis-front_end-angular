import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnderecoAPI } from './models/endereco.api.model';

@Injectable()
export class EnderecoService{

    private api_endereco:string = "https://viacep.com.br/ws";

    constructor(private http: HttpClient){}

    buscarPorCep(cep:string): Observable<EnderecoAPI>{
        return this.http.get<EnderecoAPI>(`${this.api_endereco}/${cep}/json/`);
    }

}