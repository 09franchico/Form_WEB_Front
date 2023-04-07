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

    return(
        <LayoutPage>
             <div className="card">
                <DataTable value={customers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                    <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
                    <Column field="company" header="Company" style={{ width: '25%' }}></Column>
                    <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
                    <Column  body={<Button icon="pi pi-eye" severity="secondary" aria-label="eye" />}></Column>
                    <Column header="Ações" body={<Button icon="pi pi-pencil" severity="info" aria-label="pencil" />}></Column>
                    <Column  body={<Button  icon="pi pi-trash" severity="danger" onClick={HandleClick} />} style={{ width: '5%' }}></Column>
                </DataTable>
            </div>
        </LayoutPage>
    )
}