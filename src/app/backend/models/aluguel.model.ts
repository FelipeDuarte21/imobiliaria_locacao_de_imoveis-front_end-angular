import { Locacao } from './locacao.model';

export interface Aluguel{
    idAluguel: number,
    dataVencimento: string,
    quite: boolean,
    dataPagamento: string,
    locacao: Locacao
}