import { Model } from "./model.model";

export interface Aluguel extends Model{
    id: number,
	dataVencimento: string;
	quite: boolean;
	dataPagamento: string;
}