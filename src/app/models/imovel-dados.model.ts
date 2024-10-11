import { EnderecoDados } from "./endereco-dados.model";

export interface ImovelDados{
    id: number;
	preco: number;
	tipo: string;
	descricao: string;
	endereco: EnderecoDados;
	idProprietario: number;
}