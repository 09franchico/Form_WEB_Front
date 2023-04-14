import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Password } from 'primereact/password'
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar'
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import loginImge from '../../assets/Login.svg'


type TInicialValor = {
    nome: string,
    senha: string
}
export const Login = () => {
    const toast = useRef<any>(null);

    //Validação do fromulario
    const SignupSchema = Yup.object().shape({
        nome: Yup.string()
            .min(3, 'Minimo 3 caracteres')
            .required('Nome é obrigatorio'),
        senha: Yup.string()
            .required('Senha é obrigatorio'),
    });



    const Formik = useFormik<TInicialValor>({
        initialValues: {
            nome: "",
            senha: ""
        },
        validationSchema: SignupSchema,
        onSubmit: (value: TInicialValor) => {
            console.log(value)


        }
    })

    return (
        <div className="flex flex-column md:flex-row h-screen">
            <form onSubmit={Formik.handleSubmit} className="w-full md:w-10 flex flex-column align-items-s justify-content-center gap-3 py-5">
                <div className="flex justify-content-center align-items-s">
                    <Avatar image={"https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"} className="flex align-items-center justify-content-center mr-2" size="xlarge" />
                </div>
                <div className="flex flex-wrap justify-content-center align-items-center gap-2 flex-column">
                    <span className="p-float-label">
                        <InputText
                            id="nome"
                            name="nome"
                            value={Formik.values.nome}
                            onChange={(e) =>
                                Formik.setFieldValue("nome", e.target.value)
                            }
                            size={44}
                        />
                        <label htmlFor="username">Nome</label>
                    </span>
                    {Formik.touched.nome && Formik.errors.nome ? (
                        <small className="p-error text-left">{Formik.errors.nome}</small>
                    ) : null}
                </div>
                <div className="flex flex-wrap justify-content-center align-items-center gap-2 mt-3 flex-column">
                    <span className="p-float-label">
                        <Password
                            id="senha"
                            name="senha"
                            //  mediumLabel="Senha media"
                            //  weakLabel="Senha facil" 
                            //  strongLabel="Senha forte" 
                            inputId="password"
                            value={Formik.values.senha}
                            onChange={(e) =>
                                Formik.setFieldValue("senha", e.target.value)
                            }
                            size={40}
                            feedback={false}
                            toggleMask />
                        <label htmlFor="password">Senha</label>
                    </span>
                    {Formik.touched.senha && Formik.errors.senha ? (
                        <small className="p-error text-left">{Formik.errors.senha}</small>
                    ) : null}
                </div>
                <Button label="Login" type="submit" icon="pi pi-user" className="w-10rem mx-auto bg-indigo-600 border-transparent"></Button>
            </form>
            {/* <Divider layout="vertical" className="hidden md:flex" /> */}
            <div className="flex justify-content-center align-items-center bg-bluegray-900 w-full">
                <img className="" src={loginImge}/>
            </div>
        </div>
    )

}