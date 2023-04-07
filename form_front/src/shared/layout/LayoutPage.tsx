import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export const LayoutPage = ({ children }: Props) => {
    return (
        <div className="card">
            <div className="card-container flex justify-content-between bg-primary-800 ">
                <div className="card-container flex justify-content-center align-items-center">
                    <h1 className="m-3"><i className="pi pi-prime" style={{ color: '#708090',fontSize:50 }}></i></h1>
                </div>
                <div className="card-container flex m-3">
                    <h4 className="text-200 "><i className="pi pi-user m-2" style={{ color: '#708090',fontSize:20 }}></i>Usuario</h4>
                    <h4 className="text-200 "><i className="pi pi-user m-2" style={{ color: '#708090',fontSize:20 }}></i>Perfil</h4>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>

    )
}