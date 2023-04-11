import { ReactNode } from "react"
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { FerramentaCriacao } from "../components";

type Props = {
    children: ReactNode,
    urlFerramenta?:string
    mostrarFerramenta:boolean
    filtroFerramenta?: React.Dispatch<React.SetStateAction<string>>
}

export const LayoutPage = ({ children,urlFerramenta,mostrarFerramenta,filtroFerramenta}: Props) => {
    return (
        <div className="card">
            <div className="card-container flex justify-content-between bg-primary-800 ">
                <div className="card-container flex justify-content-center align-items-center">
                    <h1 className="m-3"><i className="pi pi-prime" style={{ color: '#708090', fontSize: 50 }}></i></h1>
                </div>
                <div className="card-container flex m-3">
                    <h4 className="text-200 "><i className="pi pi-user m-2" style={{ color: '#708090', fontSize: 20 }}></i>Usuario</h4>
                    <h4 className="text-200 "><i className="pi pi-lock-open m-2" style={{ color: '#708090', fontSize: 20 }}></i>Perfil</h4>
                </div>
            </div>
            {mostrarFerramenta &&
               <FerramentaCriacao url={urlFerramenta} setfiltro={filtroFerramenta}/>
            }
            <div>
                {children}
            </div>
        </div>

    )
}