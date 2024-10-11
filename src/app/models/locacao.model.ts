import { Aluguel } from "./aluguel.model";
import { Imovel } from "./imovel.model";
import { Model } from "./model.model";

export interface Locacao extends Model{
    id: number;
    data: string;
    tempo: string;
    dataInicio: string;
    dataTermino: string;
    valor: string;
    imovel: Imovel;
	alugueis: Array<Aluguel>;
}