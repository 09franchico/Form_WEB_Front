import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {CustomerService} from "../../../../mock/CustomerService"
import { LayoutPage } from '../../../shared/layout/LayoutPage';
import { Button } from 'primereact/button';

type dataT = {
    id: number;
    name: string;
    country: {
        name: string;
        code: string;
    };
    company: string;
    date: string;
    status: string;
    verified: boolean;
    activity: number;
    representative: {
        name: string;
        image: string;
    };
    balance: number;
}
export const Pessoa = ()=>{
    const [customers, setCustomers] = useState([]);


    const HandleClick = ()=>{
        alert("Excluir com sucesso !!")
    }

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => setCustomers(data as any));
    }, []);

    // pi-user-plus
    return(
        <LayoutPage urlFerramenta='/pessoa' mostrarFerramenta={true}>
             <div className="card">
                <DataTable value={customers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Nome" style={{ width: '10%' }}></Column>
                    <Column field="country.name" header="Data de Nascimento" style={{ width: '10%' }}></Column>
                    <Column field="company" header="Bairro" style={{ width: '10%' }}></Column>
                    <Column field="representative.name" header="CEP" style={{ width: '10%' }}></Column>
                    <Column header="Ações"  body={
                          <div>
                            <Button className='m-1' icon="pi pi-eye" severity="secondary" aria-label="eye" />
                            <Button className='m-1' icon="pi pi-user-plus" severity="success" aria-label="Plus" />
                            <Button className='m-1' icon="pi pi-pencil" severity="info" aria-label="pencil"/>
                            <Button className='m-1' icon="pi pi-trash" severity="danger" onClick={HandleClick} />
                          </div>
                          } style={{width:"6.5%"}} align={'center'}>
                    
                    </Column>
                </DataTable>
            </div>
        </LayoutPage>
    )
}