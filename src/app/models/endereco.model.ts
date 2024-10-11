import { Model } from "./model.model";

export interface Endereco extends Model{
    id: number; 
    numero: string;
    logradouro: string;
    cep: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
}