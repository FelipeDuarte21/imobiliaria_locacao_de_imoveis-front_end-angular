import { Locacao } from '../locacao.model';

export interface PageLocacao{
    content: Array<Locacao>,
    pageable: Pageable,
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    sort: Sort,
    number: number,
    numberOfElements: number,
    first: boolean,
    empty: boolean
}

interface Pageable{
    sort: Sort,
    offset: number,
    pageSize: number,
    pageNumber: number,
    paged: boolean,
    unpaged: boolean
}

interface Sort{
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
}