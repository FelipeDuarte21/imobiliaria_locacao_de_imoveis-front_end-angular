import { Endereco } from './endereco.model';
import { Pessoa } from './pessoa.model';

export interface Imovel{
    idImovel: string,
    preco: number,
    tipo: string,
    descricao: string,
    disponivel: boolean,
    endereco: Endereco
    proprietario: Pessoa
}