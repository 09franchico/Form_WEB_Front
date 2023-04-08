import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router";

type Props = {
    url?:string,
}

export const FerramentaCriacao = ({url}:Props) => {
    const navigate = useNavigate()

    const lidarNavegacao = ()=>{
        if(url != ""){
            navigate("pessoa/detalhe/nova")
        }
    }

    return (
        <div className="card-container flex justify-content-between bg-primary-800 my-5 mx-2 p-2 border-round-sm">
            <div>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText placeholder="Search" width={500} />
                </span>
            </div>
            <div className="mr-2">
                <Button 
                    label="Novo" 
                    icon="pi pi-plus" 
                    severity="info" 
                    aria-label="User" 
                    onClick={lidarNavegacao}/>
            </div>
        </div>
    )
}