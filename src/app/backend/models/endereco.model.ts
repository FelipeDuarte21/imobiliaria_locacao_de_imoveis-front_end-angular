export interface Endereco{
    idEndereco: number,
    logradouroCep: {
        idLogradouroCep: number,
        logradouro: string,
        cep: string,
        complemento: {
            idComplemento: number,
            complemento: string,
        },
        bairro: {
            idBairro: number,
            nome: string,
            cidade: {
                idCidade: number,
                nome: string,
                estado: {
                    idEstado: number,
                    nome: string,
                },
            },
        },
    },
    numero: {
        idNumero: number,
        numero: string,
    },
}