import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { useEffect, useRef } from "react";
import { PessoasService, TpessoaComTipoDetalhe } from "../../service/api/pessoa/PessoaService";
import moment from "moment";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

type Props = {
    setVisusalizar: React.Dispatch<React.SetStateAction<boolean>>
    pessoaId: number
    visusalizar: boolean

}


export const ModalPessoa = ({ visusalizar, setVisusalizar, pessoaId }: Props) => {
    const [pessoa, setPessoa] = useState<TpessoaComTipoDetalhe>()
    const navigate = useNavigate()

    useEffect(() => {
        PessoasService.getById(Number(pessoaId))
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    console.log(result.data)
                    setPessoa(result)
                }
            });
    }, []);

    return (
        <div className="card flex justify-content-center">
            {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
            <Dialog header="Dados pessoais" visible={visusalizar} style={{ width: '50vw' }} onHide={() => setVisusalizar(false)}>
                <div className="m-0">
                    <div className="card-container flex">
                        <span>
                            <h3>Nome</h3>
                            {pessoa?.data.nome}
                        </span>
                        <span className="ml-8">
                            <h3>Data de Nascimento</h3>
                            {moment(pessoa?.data.dataNascimento).format("DD/MM/YYYY")}
                        </span>
                    </div>
                    <h2>Informação de endereço</h2>
                    <hr />
                    <div className="card-container flex">
                        <span>
                            <h3>Rua</h3>
                            {pessoa?.data.endereco.rua}
                        </span>
                        <span className="ml-8" >
                            <h3>Bairro</h3>
                            {pessoa?.data.endereco.bairro}
                        </span>
                        <span className="ml-8">
                            <h3>Numero</h3>
                            {pessoa?.data.endereco.numero}
                        </span>
                        <span className="ml-8">
                            <h3>CEP</h3>
                            {pessoa?.data.endereco.cep}
                        </span>
                    </div>
                </div>
                <div className="card-container flex mt-5 justify-content-center align-items-center">
                   <Button onClick={() => navigate(`/pessoa/detalhe/${pessoa?.data.id}`)}>Editar registro</Button>
                </div>
            </Dialog>
        </div>
    )
}