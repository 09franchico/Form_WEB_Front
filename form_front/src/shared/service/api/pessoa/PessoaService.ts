import { Environment } from '../../../environment';
import { IDetalhePessoa, IPessoa } from '../../../types/Pessoa';
import { Api } from '../axios-config';


type TPessoasComTipoDados = {
  status?:number,
  message?:string,
  data: IPessoa[];
}

export type TpessoaComTipoDetalhe = {
  status?:number,
  message?:string,
  data: {
    id?: number
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

}


const getAll = async (): Promise<TPessoasComTipoDados | Error> => {
  try {
    const urlRelativa = `/pessoa`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        status:data.status,
        data:data.data,
        message:data.message,
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<TpessoaComTipoDetalhe | Error> => {
  try {
    const { data } = await Api.get(`/pessoa/${id}`);

    if (data) {
      return {
        data:data.data,
        message:data.message,
        status:data.status 
      };
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>('/pessoa', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
  try {
    await Api.put<IDetalhePessoa>(`/pessoa/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoa/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};


export const PessoasService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};