import { Endereco } from "./endereco.model";
import { Model } from "./model.model";

export interface Imovel extends Model{
    id: number;
	preco: number;
	tipo: string;
    descricao: string;
    disponivel: boolean;
    endereco: Endereco;
}