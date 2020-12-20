import { Endereco } from './endereco.model';

export interface Pessoa{
    idPessoa: number,
    tipoPessoa: string,
    nome: string,
    nacionalidade: string,
    estadoCivil: string,
    dataNascimento: string,
    identidade: string,
    orgaoEmissor: string,
    dataExpedicao: string,
    cpf: string,
    email: string,
    salario: number,
    ativo: boolean,
    contatos: contato[],
    endereco: Endereco
}

interface contato{
    idContato: number,
    tipoContato: string,
    numero: string
}