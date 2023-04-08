export interface IPessoa {
    id?: number,
    nome: string,
    dataNascimento: Date,
    imagem: string,
    endereco: IEndereco
}

export interface IDetalhePessoa {
    id: number
    nome: string;
    dataNascimento: string
    imagem: string,
    endereco: {
        bairro: string,
        rua: string,
        numero: number,
        cep: string
    }
}

interface IEndereco {
    id?: string,
    bairro: string,
    rua: string,
    numero: number,
    cep: string

}