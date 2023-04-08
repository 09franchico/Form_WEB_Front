import { LayoutPage } from "../../../shared/layout/LayoutPage"
import { useEffect, useRef } from "react";
import { useFormik, FormikErrors } from 'formik';
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { InputMask } from "primereact/inputmask";
import { useNavigate, useParams } from "react-router";
import { PessoasService } from "../../../shared/service/api/pessoa/PessoaService";

interface FormValues {
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

export const PessoaDetalhe = () => {
    const toast = useRef<any>(null);
    const navigate = useNavigate()
    const { id = 'nova' } = useParams<'id'>();

    //Show Sucesso ao submeter o formulario
    const show = (data: FormValues) => {
        toast.current.show({
            severity: 'success',
            summary: 'Formulario submetido com sucesso'
        });

        setTimeout(() => {
            navigate("/");
        }, 3000);
    };

    useEffect(() => {
        if (id !== 'nova') {
            PessoasService.getById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoa');
                    } else {
                        console.log(result.data)
                        formik.setValues(result.data)
                    }
                });
        } else {
            formik.setValues({
                nome: '',
                dataNascimento: '',
                imagem: '',
                endereco: {
                    bairro: '',
                    rua: '',
                    numero: 0,
                    cep: ''
                }
            })

        }
    }, [id]);


    //Configuração Formik
    const formik = useFormik<FormValues>({
        initialValues: {
            nome: '',
            dataNascimento: '',
            imagem: '',
            endereco: {
                bairro: '',
                rua: '',
                numero: 0,
                cep: ''
            }
        },
        validate: (data: FormValues) => {
            let errors: FormikErrors<FormValues> = {};

            if (!data.nome) {
                errors.nome = 'Nome - Obrigatorio';
            }
            if (!data.dataNascimento) {
                errors.dataNascimento = "Data de Nascimento - Obrigatorio"
            }
            if (!data.endereco?.rua) {
                errors.endereco = { rua: "Rua - Obrigatorio" }
            }

            return errors;
        },
        onSubmit: (data: FormValues) => {
            //Salva pessoa
            if (id === "nova") {
                PessoasService
                    .create(data)
                    .then((result) => {
                        if (result instanceof Error) {
                            alert(result.message);
                        } else {
                            formik.resetForm();
                            data && show(data);
                        }
                    });

            } else {
                //Update de pessoa
                PessoasService
                    .updateById(Number(id), data as any)
                    .then((result) => {
                        if (result instanceof Error) {
                            alert(result.message);
                        } else {
                            formik.resetForm();
                            data && show(data);
                        }
                    });

            }
        }
    });


    //Validação dos fomularios
    const isFormFieldInvalid = (name: keyof FormValues) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name: keyof FormValues) => {
        const error = formik.errors[name];
        return isFormFieldInvalid(name) && error ? (
            <small className="p-error">{String(error)}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    return (
        <LayoutPage mostrarFerramenta={false}>

            <div className="card flex justify-content-center">
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2 ">
                    <div className="card-container flex  mt-6">
                        {/* Campo de input NOME */}
                        <span className="m-1">
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    size={50}
                                    id="nome"
                                    name="nome"
                                    value={formik.values.nome}
                                    onChange={(e) => {
                                        formik.setFieldValue('nome', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('nome') })}
                                />
                                <label htmlFor="input_value">Nome</label>
                            </span>
                            {getFormErrorMessage('nome')}
                        </span>

                        {/* Campo de input DATA DE NASCIMENTO */}
                        <span className="m-1">
                            <span className="p-float-label">
                                <Calendar
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    value={formik.values.dataNascimento}
                                    onChange={(e) => formik.setFieldValue('dataNascimento', e.target.value)}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('dataNascimento') })}
                                />
                                <label htmlFor="input_value">Data de Nascimento</label>
                            </span>
                            {getFormErrorMessage('dataNascimento')}
                        </span>
                    </div>

                    <label htmlFor="text" className="my-3">Informações de endereço</label>

                    {/* Campo de input CEP */}
                    <span className="m-1">
                        <span className="p-float-label">
                            <InputMask
                                id="cep"
                                name="cep"
                                value={formik.values.endereco.cep}
                                onChange={(e) => {
                                    formik.setFieldValue('endereco.cep', e.target.value);
                                }}
                                mask="999999-999"
                                placeholder="999999-999"
                                className={classNames({ 'p-invalid': isFormFieldInvalid('endereco') })}
                            />
                            <label htmlFor="input_value">CEP</label>
                        </span>
                        {getFormErrorMessage('endereco')}
                    </span>

                    <div className="card-container flex">
                        {/* Campo de input Rua */}
                        <span className="m-1">
                            <span className="p-float-label">
                                <InputText
                                    size={50}
                                    id="rua"
                                    name="rua"
                                    value={formik.values.endereco.rua}
                                    onChange={(e) => {
                                        formik.setFieldValue('endereco.rua', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid("endereco") })}
                                />
                                <label htmlFor="input_value">Rua</label>
                            </span>
                            {getFormErrorMessage('endereco')}
                        </span>

                        {/* Campo de input Bairro */}
                        <span className="m-1">
                            <span className="p-float-label">
                                <InputText
                                    id="bairro"
                                    name="bairro"
                                    value={formik.values.endereco.bairro}
                                    onChange={(e) => {
                                        formik.setFieldValue('endereco.bairro', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid("endereco") })}
                                />
                                <label htmlFor="input_value">Bairro</label>
                            </span>
                            {getFormErrorMessage('endereco')}
                        </span>

                        {/* Campo de input Numero */}
                        <span className="m-1">
                            <span className="p-float-label">
                                <InputText
                                    id="numero"
                                    name="numero"
                                    value={formik.values.endereco.numero.toString()}
                                    onChange={(e) => {
                                        formik.setFieldValue('endereco.numero', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid("endereco") })}
                                />
                                <label htmlFor="input_value">Numero</label>
                            </span>
                            {getFormErrorMessage('endereco')}

                        </span>
                    </div>

                    {/* Botão para submeter o formulario */}
                    <Button type="submit" label="Submit" />
                </form>

            </div>

        </LayoutPage>
    )
}