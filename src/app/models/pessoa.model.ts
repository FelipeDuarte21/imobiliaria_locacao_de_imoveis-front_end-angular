import { Contato } from "./contato.model";
import { Endereco } from "./endereco.model";
import { Imovel } from "./imovel.model";
import { Locacao } from "./locacao.model";
import { Model } from "./model.model";

export interface Pessoa extends Model{
    id: number;
    tipoPessoa: string;
    nome: string;
    nacionalidade: string;
    estadoCivil: string;
    dataNascimento: string;
    identidade: string;
    orgaoEmissor: string;
    dataExpedicao: string;
    cpf: string;
    email: string;
    salario: number; 
    ativo: boolean;
    endereco: Endereco;
	contatos: Array<Contato>;
    imoveis: Array<Imovel>;
    locacoes: Array<Locacao>;
}