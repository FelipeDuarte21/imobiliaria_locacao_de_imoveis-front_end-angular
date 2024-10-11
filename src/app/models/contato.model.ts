import { Model } from "./model.model";

export interface Contato extends Model{
    id: number;
	tipo: string;
	numero: string;
}