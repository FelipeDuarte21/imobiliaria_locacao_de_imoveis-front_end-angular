import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnderecoAPI } from './models/endereco.api.model';

@Injectable()
export class EnderecoService{

    private api_endereco:string = "https://viacep.com.br/ws";

    constructor(private http: Http){}

    buscarPorCep(cep:string): Observable<EnderecoAPI>{
        return this.http.get(`${this.api_endereco}/${cep}/json/`).pipe(map(res => res.json()));
    }

}