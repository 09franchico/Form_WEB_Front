import { ReactNode, useState } from "react"
import { InputText } from "primereact/inputtext";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';
import { FerramentaCriacao } from "../components";
import { Navigate, useNavigate } from "react-router";

type Props = {
    children: ReactNode,
    urlFerramenta?: string
    mostrarFerramenta: boolean
    filtroFerramenta?: React.Dispatch<React.SetStateAction<string>>
}

export const LayoutPage = ({ children, urlFerramenta, mostrarFerramenta, filtroFerramenta }: Props) => {
    const [visible, setVisible] = useState(false);
    const navegate = useNavigate();
    const items = [
        {
            label:'Home',
            icon:'pi pi-fw pi-file',
            command: () => { navegate("/")}
        

        },
        {
            label:'Cadastros',
            icon:'pi pi-fw pi-pencil',
            items:[
                {
                    label:'Usuario',
                    icon:'pi pi-fw pi-user',
                    command: () => { navegate("/login")}
                },
                {
                    label:'Aluno',
                    icon:'pi pi-fw pi-user'
                }
            ]
        },
        {
            label:'Prova',
            icon:'pi pi-fw pi-calendar',
            items:[
                {
                    label:'New',
                    icon:'pi pi-fw pi-user-plus'
                },
                {
                    label:'Delete',
                    icon:'pi pi-fw pi-user-minus'
                },
                {
                    label:'Search',
                    icon:'pi pi-fw pi-users',
                    items:[
                    {
                        label:'Filter',
                        icon:'pi pi-fw pi-filter',
                        items:[
                            {
                                label:'Print',
                                icon:'pi pi-fw pi-print'
                            }
                        ]
                    },
                    {
                        icon:'pi pi-fw pi-bars',
                        label:'List'
                    }
                    ]
                }
            ]
        },
        {
            label:'Correção',
            icon:'pi pi-fw pi-calendar',
            items:[
                {
                    label:'Edit',
                    icon:'pi pi-fw pi-pencil',
                    items:[
                    {
                        label:'Save',
                        icon:'pi pi-fw pi-calendar-plus'
                    },
                    {
                        label:'Delete',
                        icon:'pi pi-fw pi-calendar-minus'
                    }
                    ]
                },
                {
                    label:'Archive',
                    icon:'pi pi-fw pi-calendar-times',
                    items:[
                    {
                        label:'Remove',
                        icon:'pi pi-fw pi-calendar-minus'
                    }
                    ]
                }
            ]
        }
    ];
    
    
    return (
        <div className="card">
            <div className="card flex justify-content-center">
                {/* <Sidebar visible={visible} modal={false} className="layout-config-sidebar w-20rem" onHide={() => setVisible(false)}>
                    <div className="card flex justify-content-center">
                        <PanelMenu model={items} className="w-full md:w-25rem" />
                    </div>
                </Sidebar> */}
            </div>
            <div className="card-container flex justify-content-between align-items-center  bg-primary-800 ">
                <i className="pi pi-align-justify ml-5" style={{ fontSize: '2rem', color: 'white' }} onClick={() => setVisible(true)}></i>
                <div className="card-container flex justify-content-center align-items-center">
                    <h1 className="m-3"><i className="pi pi-prime" style={{ color: '#708090', fontSize: 50 }}></i></h1>
                </div>
                <div className="card-container flex m-3">
                    <h4 className="text-200 "><i className="pi pi-user m-2" style={{ color: '#708090', fontSize: 20 }}></i>Usuario</h4>
                    <h4 className="text-200 "><i className="pi pi-lock-open m-2" style={{ color: '#708090', fontSize: 20 }}></i>Perfil</h4>
                </div>
            </div>
            {mostrarFerramenta &&
                <FerramentaCriacao url={urlFerramenta} setfiltro={filtroFerramenta} />
            }
            <div>
                {children}
            </div>
        </div>

    )
}