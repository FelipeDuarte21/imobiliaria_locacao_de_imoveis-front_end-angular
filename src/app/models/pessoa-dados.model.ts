import { ContatoDados } from "./contato-dados.model";
import { EnderecoDados } from "./endereco-dados.model";

export interface PessoaDados{
    id: number;
	tipoPessoa: number;
	nome: string;
	nacionalidade: string;
	estadoCivil: number;
	dataNascimento: string;
	identidade: string;
	orgaoEmissor: string;
	dataExpedicao: string;
	cpf: string;
	email: string;
	salario: number;
    contatos: Array<ContatoDados>;
	endereco: EnderecoDados;
}