import { Imovel } from './imovel.model';
import { Pessoa } from './pessoa.model';

export interface Locacao{
    idLocacao:string,
    data: string,
    tempo: string,
    dataInicio: string,
    dataTermino: string,
    valor: number,
    imovel: Imovel,
    inquilino: Pessoa
}