import { EnderecoDTO } from './endereco.dto.model';

export interface ImovelDTO{
    idImovel: string,
    preco: number,
    tipo: string,
    descricao: string,
    endereco: EnderecoDTO,
    idProprietario: string
}